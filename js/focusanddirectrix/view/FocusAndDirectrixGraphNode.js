// Copyright 2018-2021, University of Colorado Boulder

// @ts-nocheck
/**
 * Graph for the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import GQGraphNode from '../../common/view/GQGraphNode.js';
import VertexManipulator from '../../common/view/VertexManipulator.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import DirectrixNode from './DirectrixNode.js';
import FocusManipulator from './FocusManipulator.js';
import PointOnParabolaLinesNode from './PointOnParabolaLinesNode.js';
import PointOnParabolaManipulator from './PointOnParabolaManipulator.js';

export default class FocusAndDirectrixGraphNode extends GQGraphNode {

  /**
   * @param {FocusAndDirectrixModel} model
   * @param {FocusAndDirectrixViewProperties} viewProperties
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( model, viewProperties, tandem, options ) {

    // We do NOT want to instrument the graph, so tandem is not propagated via options
    options = options || {};

    // Directrix line
    const directrixNode = new DirectrixNode(
      model.quadraticProperty,
      model.graph,
      model.modelViewTransform,
      viewProperties.directrixVisibleProperty,
      viewProperties.equationsVisibleProperty );

    // Vertex manipulator
    const vertexManipulator = new VertexManipulator(
      model.hProperty,
      model.kProperty,
      model.quadraticProperty,
      model.graph,
      model.modelViewTransform,
      viewProperties.vertexVisibleProperty,
      viewProperties.coordinatesVisibleProperty, {
        tandem: tandem.createTandem( 'vertexManipulator' ),
        phetioDocumentation: 'the manipulator for changing the vertex'
      } );

    // Focus manipulator
    const focusManipulator = new FocusManipulator(
      model.pProperty,
      model.quadraticProperty,
      model.graph,
      model.modelViewTransform,
      viewProperties.focusVisibleProperty,
      viewProperties.coordinatesVisibleProperty, {
        tandem: tandem.createTandem( 'focusManipulator' ),
        phetioDocumentation: 'the manipulator for changing the focus'
      } );

    // Point on Quadratic manipulator
    const pointOnParabolaManipulator = new PointOnParabolaManipulator(
      model.pointOnParabolaProperty,
      model.quadraticProperty,
      model.graph,
      model.modelViewTransform,
      viewProperties.coordinatesVisibleProperty, {
        visibleProperty: viewProperties.pointOnParabolaVisibleProperty,
        tandem: tandem.createTandem( 'pointOnParabolaManipulator' ),
        phetioDocumentation: 'the manipulator for changing the point on the parabola'
      } );

    // Lines that connect the point on the parabola to the focus and directrix
    const pointOnParabolaLinesNode = new PointOnParabolaLinesNode(
      model.quadraticProperty,
      model.pointOnParabolaProperty,
      model.modelViewTransform,
      viewProperties.pointOnParabolaVisibleProperty,
      viewProperties.focusVisibleProperty,
      viewProperties.directrixVisibleProperty );

    assert && assert( !options.otherCurves, 'FocusAndDirectrixGraphNode sets otherCurves' );
    options.otherCurves = [ directrixNode, pointOnParabolaLinesNode ]; // rendered in this order

    assert && assert( !options.decorations, 'FocusAndDirectrixGraphNode sets decorations' );
    options.decorations = [ vertexManipulator, focusManipulator, pointOnParabolaManipulator ]; // rendered in this order

    super( model, viewProperties, options );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixGraphNode', FocusAndDirectrixGraphNode );