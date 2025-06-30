// Copyright 2014-2025, University of Colorado Boulder

/**
 * GQGraphNode is the base class for displaying the graph.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import GraphNode from '../../../../graphing-lines/js/common/view/GraphNode.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import IndexedNodeIO from '../../../../scenery/js/nodes/IndexedNodeIO.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';
import GQSymbols from '../GQSymbols.js';
import GQModel from '../model/GQModel.js';
import GQViewProperties from './GQViewProperties.js';
import QuadraticNode, { QuadraticNodeOptions } from './QuadraticNode.js';

type SelfOptions = {

  // prevent a parabola's vertex and equation from overlapping
  preventVertexAndEquationOverlap?: boolean;

  // other curves to be displayed (terms, directrix, axis of symmetry) rendered in the order provided
  otherCurves?: Node[];

  // decorations (manipulators, roots,...) rendered in the order provided
  decorations?: Node[];
};

export type GQGraphNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class GQGraphNode extends Node {

  protected constructor( model: GQModel, viewProperties: GQViewProperties, providedOptions?: GQGraphNodeOptions ) {

    const options = optionize<GQGraphNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      preventVertexAndEquationOverlap: true,
      otherCurves: [],
      decorations: [],

      // NodeOptions
      isDisposable: false,
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    super( options );

    // Cartesian coordinates graph
    const graphNode = new GraphNode( model.graph, model.modelViewTransform, GQSymbols.xMarkupStringProperty, GQSymbols.yMarkupStringProperty );

    // All children of allLinesParent must be instrumented, IndexedNodeIO, and stateful to make z-order stateful.
    // See https://github.com/phetsims/graphing-quadratics/issues/202
    const indexedNodeOptions: PhetioObjectOptions = {
      phetioType: IndexedNodeIO,
      phetioState: true,
      phetioReadOnly: true // so its index cannot be changed
    };

    // Interactive quadratic
    const interactiveQuadraticNode = new QuadraticNode(
      model.quadraticProperty,
      model.graph.xRange,
      model.graph.yRange,
      model.modelViewTransform,
      viewProperties.equationForm,
      viewProperties.equationsVisibleProperty,
      combineOptions<QuadraticNodeOptions>( {}, {
        lineWidth: GQConstants.INTERACTIVE_QUADRATIC_LINE_WIDTH,
        preventVertexAndEquationOverlap: options.preventVertexAndEquationOverlap,
        tandem: options.tandem.createTandem( 'interactiveQuadraticNode' )
      }, indexedNodeOptions )
    );

    // Updated only when model.savedQuadraticProperty is not null
    const nonNullSavedQuadraticProperty = new Property( model.quadraticProperty.value );

    // Saved quadratic
    const savedQuadraticNode = new QuadraticNode(
      nonNullSavedQuadraticProperty,
      model.graph.xRange,
      model.graph.yRange,
      model.modelViewTransform,
      viewProperties.equationForm,
      viewProperties.equationsVisibleProperty,
      combineOptions<QuadraticNodeOptions>( {}, {

        // visible if a saved quadratic exists
        visibleProperty: new DerivedProperty( [ model.savedQuadraticProperty ], savedQuadratic => !!savedQuadratic ),
        lineWidth: GQConstants.SAVED_QUADRATIC_LINE_WIDTH,
        preventVertexAndEquationOverlap: options.preventVertexAndEquationOverlap,
        tandem: options.tandem.createTandem( 'savedQuadraticNode' )
      }, indexedNodeOptions )
    );

    // Parent for other lines, e.g. quadratic terms, directrix, axis of symmetry
    const otherCurvesLayer = new Node( combineOptions<NodeOptions>( {
      children: options.otherCurves,
      tandem: options.tandem.createTandem( 'otherCurvesLayer' ),
      phetioVisiblePropertyInstrumented: false
    }, indexedNodeOptions ) );

    // All lines, clipped to the graph
    const allLinesParent = new Node( {
      clipArea: Shape.rectangle(
        model.graph.xRange.min,
        model.graph.yRange.min,
        model.graph.xRange.getLength(),
        model.graph.yRange.getLength()
      ).transformed( model.modelViewTransform.getMatrix() ),
      children: [ savedQuadraticNode, otherCurvesLayer, interactiveQuadraticNode ]
    } );

    // Parent for decorations, e.g. vertex, roots, manipulators. This Node is NOT clipped to the graph.
    const decorationsLayer = new Node( {
      children: options.decorations
    } );

    // Everything that's on the graph
    const contentParent = new Node( {
      children: [ allLinesParent, decorationsLayer ]
    } );

    // rendering order
    this.addChild( graphNode );
    this.addChild( contentParent );

    // When the saved quadratic changes...
    model.savedQuadraticProperty.link( savedQuadratic => {
      if ( savedQuadratic ) {
        nonNullSavedQuadraticProperty.value = savedQuadratic;
      }
    } );

    model.isSavedQuadraticInFrontProperty.link( isSavedQuadraticInFront => {
      if ( isSavedQuadraticInFront ) {
        savedQuadraticNode.moveToFront();
      }
      else {
        savedQuadraticNode.moveToBack();
      }
    } );

    // Show/hide the graph contents
    viewProperties.graphContentsVisibleProperty.link( visible => {
      contentParent.visible = visible;
      if ( !visible ) {
        decorationsLayer.interruptSubtreeInput(); // cancel interaction with graph contents
      }
    } );
  }
}

graphingQuadratics.register( 'GQGraphNode', GQGraphNode );