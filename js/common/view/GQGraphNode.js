// Copyright 2014-2021, University of Colorado Boulder

/**
 * Base class for displaying the graph.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import GraphNode from '../../../../graphing-lines/js/common/view/GraphNode.js';
import Shape from '../../../../kite/js/Shape.js';
import merge from '../../../../phet-core/js/merge.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';
import QuadraticNode from './QuadraticNode.js';

// constants
const DEFAULT_OTHER_CURVES = [];
const DEFAULT_DECORATIONS = [];

class GQGraphNode extends Node {

  /**
   * @param {GQModel} model
   * @param {GQViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( model, viewProperties, options ) {

    options = merge( {

      // prevent a parabola's vertex and equation from overlapping
      preventVertexAndEquationOverlap: true,

      // {Node[]}, other curves to be displayed (terms, directrix, axis of symmetry) rendered in the order provided
      otherCurves: DEFAULT_OTHER_CURVES,

      // {Node[]}, decorations (manipulators, roots,...) rendered in the order provided
      decorations: DEFAULT_DECORATIONS
    }, options );

    assert && assert( !options.tandem, 'GQGraphNode should not be instrumented' );

    super( options );

    // Cartesian coordinates graph
    const graphNode = new GraphNode( model.graph, model.modelViewTransform );

    // Interactive quadratic curve
    const interactiveQuadraticNode = new QuadraticNode(
      model.quadraticProperty,
      model.graph.xRange,
      model.graph.yRange,
      model.modelViewTransform,
      viewProperties.equationForm,
      viewProperties.equationsVisibleProperty, {
        lineWidth: GQConstants.INTERACTIVE_QUADRATIC_LINE_WIDTH,
        preventVertexAndEquationOverlap: options.preventVertexAndEquationOverlap
      } );

    // {QuadraticNode|null} the saved line
    let savedQuadraticNode = null;

    // Parent for other lines, e.g. quadratic terms, directrix, axis of symmetry
    const otherCurvesLayer = new Node( { children: options.otherCurves } );

    // Parent for decorations, e.g. vertex, roots, manipulators
    const decorationsLayer = new Node( { children: options.decorations } );

    // All lines, clipped to the graph
    const allLinesParent = new Node( {
      clipArea: Shape.rectangle(
        model.graph.xRange.min,
        model.graph.yRange.min,
        model.graph.xRange.getLength(),
        model.graph.yRange.getLength()
      ).transformed( model.modelViewTransform.getMatrix() ),
      children: [ otherCurvesLayer, interactiveQuadraticNode ]
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

      // Remove and dispose of any previously-saved quadratic.
      if ( savedQuadraticNode ) {
        allLinesParent.removeChild( savedQuadraticNode );
        savedQuadraticNode.dispose();
        savedQuadraticNode = null;
      }

      if ( savedQuadratic ) {
        savedQuadraticNode = new QuadraticNode(
          new Property( savedQuadratic ),
          model.graph.xRange,
          model.graph.yRange,
          model.modelViewTransform,
          viewProperties.equationForm,
          viewProperties.equationsVisibleProperty, {
            lineWidth: GQConstants.SAVED_QUADRATIC_LINE_WIDTH,
            preventVertexAndEquationOverlap: options.preventVertexAndEquationOverlap
          } );

        // Add savedQuadraticNode to the foreground, so the user can see it.
        // See https://github.com/phetsims/graphing-quadratics/issues/36
        allLinesParent.addChild( savedQuadraticNode );

        // When restoring state, move savedQuadraticNode to the background if savedQuadratic is NOT identical to
        // quadraticProperty, because that means that the user changed quadraticProperty after taking the snapshot,
        // and the primary quadratic should be in front. If savedQuadratic IS identical to quadraticProperty, we want
        // to leave savedQuadraticNode in the foreground, and let the quadraticProperty listener below handle moving
        // it to the back, when the user makes changes to quadraticProperty.
        // See https://github.com/phetsims/graphing-quadratics/issues/165
        if ( phet.joist.sim.isSettingPhetioStateProperty.value && !savedQuadratic.hasSameCoefficients( model.quadraticProperty.value ) ) {
          savedQuadraticNode.moveToBack();
        }
      }
    } );

    // When quadraticProperty is changed BY THE USER, move the saved quadratic to the background.
    // See https://github.com/phetsims/graphing-quadratics/issues/36 and https://github.com/phetsims/graphing-quadratics/issues/165.
    model.quadraticProperty.link( quadratic => {
      if ( !phet.joist.sim.isSettingPhetioStateProperty.value ) {
        savedQuadraticNode && savedQuadraticNode.moveToBack();
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
export default GQGraphNode;