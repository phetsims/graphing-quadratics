// Copyright 2018, University of Colorado Boulder

/**
 * Base type for scenes in Graphing Quadratics
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const Graph = require( 'GRAPHING_LINES/common/model/Graph' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const ObservableArray = require( 'AXON/ObservableArray' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const GRID_VIEW_UNITS = 530; // max dimension (width or height) of the grid in view coordinates
  const ORIGIN_OFFSET = new Vector2( 315, 330 ); // offset of the graph's origin in view coordinates

  /**
   * @constructor
   */
  function GQScene() {

    // @public graph
    this.graph = new Graph( GQConstants.X_AXIS_RANGE, GQConstants.Y_AXIS_RANGE );

    // @public properties relating to the quadratic. // TODO: move into something like a QuadraticFormsGraphNode
    this.aProperty = new NumberProperty( 1, { range: { min:-6, max: 6 } } );
    this.bProperty = new NumberProperty( 0, { range: { min:-6, max: 6 } } );
    this.cProperty = new NumberProperty( 0, { range: { min:-6, max: 6 } } );

    // @public contains the active quadratic that updates based on coefficients a, b, and c
    this.quadraticProperty = new DerivedProperty( [
        this.aProperty,
        this.bProperty,
        this.cProperty
    ], function( a, b, c ) { return new Quadratic( a, b, c ); } );

    // @public observable array of saved quadratics
    this.savedQuadratics = new ObservableArray( [] );

    // view units / model units
    const modelViewTransformScale = GRID_VIEW_UNITS / Math.max(
      this.graph.xRange.getLength(),
      this.graph.yRange.getLength()
    );

    // @public model-view transform, created in the model because it's dependent on graph axes ranges.
    this.modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping(
      ORIGIN_OFFSET,
      modelViewTransformScale,
      -modelViewTransformScale // y is inverted
    );
  }

  graphingQuadratics.register( 'GQScene', GQScene );

  return inherit( Object, GQScene, {

    /**
     * Resets this scene by resetting each of its properties
     *
     * @public
     */
    reset: function() {
      this.aProperty.reset();
      this.bProperty.reset();
      this.cProperty.reset();
      this.clearQuadratics();
    },

    /**
     * Saves the current quadratic into the list
     *
     * @public
     */
    saveQuadratic: function() {
      this.clearQuadratics();
      this.savedQuadratics.add( this.quadraticProperty.get().getCopy() );
    },

    /**
     * Clears the list of saved Quadratics
     *
     * @public
     */
    clearQuadratics: function() {
      this.savedQuadratics.clear();
    }
  } );
} );
