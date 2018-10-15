// Copyright 2018, University of Colorado Boulder

/**
 * Graph for the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DirectrixNode = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/DirectrixNode' );
  const FocusManipulator = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusManipulator' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQGraphNode = require( 'GRAPHING_QUADRATICS/common/view/GQGraphNode' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const PointOnParabolaLinesNode = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/PointOnParabolaLinesNode' );
  const PointOnParabolaManipulator = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/PointOnParabolaManipulator' );
  const VertexManipulator = require( 'GRAPHING_QUADRATICS/common/view/VertexManipulator' );

  class FocusAndDirectrixGraphNode extends GQGraphNode {

    /**
     * @param {FocusAndDirectrixModel} model
     * @param {FocusAndDirectrixViewProperties} viewProperties
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( model, viewProperties, tandem, options ) {

      // We do NOT want to instrument the graph, so tandem is not propagated via options
      options = options || {};

      // Directrix
      const directrixNode = new DirectrixNode(
        model.quadraticProperty,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.directrixVisibleProperty,
        viewProperties.equationsVisibleProperty );

      // Vertex manipulator
      const vertexManipulator = new VertexManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.hProperty,
        model.kProperty,
        model.graph,
        model.modelViewTransform,
        viewProperties.vertexVisibleProperty,
        viewProperties.coordinatesVisibleProperty, {
          tandem: tandem.createTandem( 'vertexManipulator' )
        } );

      // Focus manipulator
      const focusManipulator = new FocusManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.pProperty,
        model.graph,
        model.modelViewTransform,
        viewProperties.focusVisibleProperty,
        viewProperties.coordinatesVisibleProperty, {
          tandem: tandem.createTandem( 'focusManipulator' )
        } );

      // Point on Quadratic manipulator
      const pointOnParabolaManipulator = new PointOnParabolaManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.pointOnParabolaProperty,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.pointOnParabolaVisibleProperty,
        viewProperties.coordinatesVisibleProperty, {
          tandem: tandem.createTandem( 'pointOnParabolaManipulator' )
        } );

      // Lines that connect the point on the quadratic to the focus and directrix
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

  return graphingQuadratics.register( 'FocusAndDirectrixGraphNode', FocusAndDirectrixGraphNode );
} );