// Copyright 2014-2023, University of Colorado Boulder

/**
 * GQGraphNode is the base class for displaying the graph.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import GraphNode from '../../../../graphing-lines/js/common/view/GraphNode.js';
import { Shape } from '../../../../kite/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { IndexedNodeIO, Node, NodeOptions } from '../../../../scenery/js/imports.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';
import GQModel from '../model/GQModel.js';
import GQViewProperties from './GQViewProperties.js';
import QuadraticNode from './QuadraticNode.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import GQSymbols from '../GQSymbols.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

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
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    super( options );

    // Cartesian coordinates graph
    const graphNode = new GraphNode( model.graph, model.modelViewTransform, GQSymbols.xMarkupStringProperty, GQSymbols.yMarkupStringProperty );

    // Interactive quadratic
    const interactiveQuadraticNode = new QuadraticNode(
      model.quadraticProperty,
      model.graph.xRange,
      model.graph.yRange,
      model.modelViewTransform,
      viewProperties.equationForm,
      viewProperties.equationsVisibleProperty, {
        lineWidth: GQConstants.INTERACTIVE_QUADRATIC_LINE_WIDTH,
        preventVertexAndEquationOverlap: options.preventVertexAndEquationOverlap,

        // All children of allLinesParent must be instrumented, IndexedNodeIO, and stateful to make z-order stateful.
        // See https://github.com/phetsims/graphing-quadratics/issues/202
        tandem: options.tandem.createTandem( 'interactiveQuadraticNode' ),
        phetioType: IndexedNodeIO,
        phetioState: true
      } );

    // Updated only when model.savedQuadraticProperty is not null
    const nonNullSavedQuadraticProperty = new Property( model.quadraticProperty.value );

    // Saved quadratic
    const savedQuadraticNode = new QuadraticNode(
      nonNullSavedQuadraticProperty,
      model.graph.xRange,
      model.graph.yRange,
      model.modelViewTransform,
      viewProperties.equationForm,
      viewProperties.equationsVisibleProperty, {
        lineWidth: GQConstants.SAVED_QUADRATIC_LINE_WIDTH,
        preventVertexAndEquationOverlap: options.preventVertexAndEquationOverlap,

        // visible if a saved quadratic exists
        visibleProperty: new DerivedProperty( [ model.savedQuadraticProperty ], savedQuadratic => !!savedQuadratic ),

        // All children of allLinesParent must be instrumented, IndexedNodeIO, and stateful to make z-order stateful.
        // See https://github.com/phetsims/graphing-quadratics/issues/202
        tandem: options.tandem.createTandem( 'savedQuadraticNode' ),
        phetioType: IndexedNodeIO,
        phetioState: true
      } );

    // Parent for other lines, e.g. quadratic terms, directrix, axis of symmetry
    const otherCurvesLayer = new Node( {
      children: options.otherCurves,

      // All children of allLinesParent must be instrumented, IndexedNodeIO, and stateful to make z-order stateful.
      // See https://github.com/phetsims/graphing-quadratics/issues/202
      tandem: options.tandem.createTandem( 'otherCurvesLayer' ),
      phetioType: IndexedNodeIO,
      phetioState: true,
      phetioVisiblePropertyInstrumented: false
    } );

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

        // When a quadratic is saved by the user (versus PhET-iO state), move it to the front, so that it
        // appears in front of the interactive quadratic. See https://github.com/phetsims/graphing-quadratics/issues/202
        if ( !isSettingPhetioStateProperty.value ) {
          savedQuadraticNode.moveToFront();
        }
      }
    } );

    // When the interactive quadratic is changed by the user (versus PhET-iO state), move the saved quadratic
    // to the back. See https://github.com/phetsims/graphing-quadratics/issues/202
    model.quadraticProperty.link( quadratic => {
      if ( !isSettingPhetioStateProperty.value ) {
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