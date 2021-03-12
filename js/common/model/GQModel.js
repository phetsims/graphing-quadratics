// Copyright 2014-2020, University of Colorado Boulder

/**
 * Abstract base class for model in Graphing Quadratics.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Graph from '../../../../graphing-lines/js/common/model/Graph.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQColors from '../GQColors.js';
import GQConstants from '../GQConstants.js';
import PointTool from './PointTool.js';
import Quadratic from './Quadratic.js';

// constants
const GRAPH_VIEW_ORIGIN = new Vector2( 345, 330 ); // position of the graph's origin, in view coordinates
const GRAPH_VIEW_WIDTH = 530; // width of the graph, in view coordinates

class GQModel {

  /**
   * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
   * @param {Tandem} tandem
   * @abstract
   */
  constructor( quadraticProperty, tandem ) {

    // @public {Property.<Quadratic>} the interactive quadratic
    this.quadraticProperty = quadraticProperty;

    // @public (read-only) graph
    this.graph = new Graph( GQConstants.X_AXIS_RANGE, GQConstants.Y_AXIS_RANGE );

    // @public {Property.<Quadratic|null>} the saved quadratic, null if nothing is saved
    this.savedQuadraticProperty = new Property( null, {
      valueType: [ Quadratic, null ],
      tandem: tandem.createTandem( 'savedQuadraticProperty' ),
      phetioDocumentation: 'the saved quadratic, null if there is no saved quadratic',
      phetioType: Property.PropertyIO( NullableIO( Quadratic.QuadraticIO ) )
    } );

    // scale from model to view
    const modelViewTransformScale = GRAPH_VIEW_WIDTH / this.graph.xRange.getLength();

    // @public (read-only) model-view transform, created in the model because it's dependent on graph axes ranges.
    this.modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping(
      GRAPH_VIEW_ORIGIN,
      modelViewTransformScale,
      -modelViewTransformScale // y is inverted (+y is up in the model, +y is down in the view)
    );

    // Options for {Property.<Quadratic[]>}
    const optionsPropertyQuadraticArray = {
      isValidValue: array => Array.isArray( array ) &&
                             _.every( array, value => value instanceof Quadratic )
    };

    // @public {Property.<Quadratic[]>} optional quadratic terms to be displayed,
    // in the order that they will be considered by point tools (foreground to background).
    // ObservableArrayDef is not used here because we need to change the entire array contents atomically.
    this.quadraticTermsProperty = new Property( [], optionsPropertyQuadraticArray );

    // {DerivedProperty.<Quadratic[]>} Quadratics that are visible to the point tools,
    // in the order that they will be considered by point tools (foreground to background).
    // ObservableArrayDef is not used here because we need to change the entire array contents atomically.
    const pointToolQuadraticsProperty = new DerivedProperty(
      [ this.quadraticProperty, this.quadraticTermsProperty, this.savedQuadraticProperty ],
      ( quadratic, quadraticTerms, savedQuadratic ) => {
        // order is important! compact to remove nulls
        return _.compact( [ quadratic, ...quadraticTerms, savedQuadratic ] );
      }, optionsPropertyQuadraticArray );

    // @public (read-only)
    this.leftPointTool = new PointTool( pointToolQuadraticsProperty, this.graph, {
      probeSide: 'right', // probe is attached to the right side
      position: new Vector2( -2, this.graph.yRange.min - 2 ), // below the graph
      dragBounds: new Bounds2(
        this.graph.xRange.min - 1, this.graph.yRange.min - 3,
        this.graph.xRange.max + 1, this.graph.yRange.max + 1 ),
      tandem: tandem.createTandem( 'leftPointTool' ),
      phetioDocumentation: 'The point tool that is initially on the left. It is typically grabbed from the left, and its probe is on the right.'
    } );

    // @public (read-only)
    this.rightPointTool = new PointTool( pointToolQuadraticsProperty, this.graph, {
      probeSide: 'left', // probe is attached to the left side
      position: new Vector2( 2, this.graph.yRange.min - 2 ), // below the graph
      dragBounds: new Bounds2(
        this.graph.xRange.min - 1, this.graph.yRange.min - 3,
        this.graph.xRange.max + 1, this.graph.yRange.max + 1 ),
      tandem: tandem.createTandem( 'rightPointTool' ),
      phetioDocumentation: 'The point tool that is initially on the right. It is typically grabbed from the right, and its probe is on the left.'
    } );
  }

  // @public
  reset() {
    this.savedQuadraticProperty.reset();
    this.leftPointTool.reset();
    this.rightPointTool.reset();
  }

  /**
   * Saves the interactive quadratic.
   * @public
   */
  saveQuadratic() {
    this.savedQuadraticProperty.value = this.quadraticProperty.value.withColor( GQColors.SAVED_CURVE );
  }

  /**
   * Erases the saved quadratic.
   * @public
   */
  eraseQuadratic() {
    this.savedQuadraticProperty.value = null;
  }
}

graphingQuadratics.register( 'GQModel', GQModel );
export default GQModel;