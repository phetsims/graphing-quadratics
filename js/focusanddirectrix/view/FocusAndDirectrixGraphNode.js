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
  const PointOnQuadraticLinesNode = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/PointOnQuadraticLinesNode' );
  const PointOnQuadraticManipulator = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/PointOnQuadraticManipulator' );
  const VertexManipulator = require( 'GRAPHING_QUADRATICS/common/view/VertexManipulator' );

  class FocusAndDirectrixGraphNode extends GQGraphNode {

    /**
     * @param {GQModel} model
     * @param {GQViewProperties} viewProperties
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
        model.graph,
        model.hRange,
        model.kRange,
        model.modelViewTransform,
        viewProperties.vertexVisibleProperty,
        viewProperties.coordinatesVisibleProperty, {
          tandem: tandem.createTandem( 'vertexManipulator' )
        } );

      // Focus manipulator
      const focusManipulator = new FocusManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.pRange,
        model.graph,
        model.modelViewTransform,
        viewProperties.focusVisibleProperty,
        viewProperties.coordinatesVisibleProperty, {
          tandem: tandem.createTandem( 'focusManipulator' )
        } );

      // Point on Quadratic manipulator
      const pointOnQuadraticManipulator = new PointOnQuadraticManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.pointOnQuadraticProperty,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.pointOnQuadraticVisibleProperty,
        viewProperties.coordinatesVisibleProperty, {
          tandem: tandem.createTandem( 'pointOnQuadraticManipulator' )
        } );

      // Lines that connect the point on the quadratic to the focus and directrix
      const pointOnQuadraticLinesNode = new PointOnQuadraticLinesNode(
        model.quadraticProperty,
        model.pointOnQuadraticProperty,
        model.modelViewTransform,
        viewProperties.pointOnQuadraticVisibleProperty,
        viewProperties.focusVisibleProperty,
        viewProperties.directrixVisibleProperty );

      assert && assert( !options.specialLines, 'FocusAndDirectrixGraphNode sets specialLines' );
      options.specialLines = [ directrixNode, pointOnQuadraticLinesNode ]; // rendered in this order

      assert && assert( !options.decorations, 'FocusAndDirectrixGraphNode sets decorations' );
      options.decorations = [ vertexManipulator, focusManipulator, pointOnQuadraticManipulator ]; // rendered in this order

      super( model, viewProperties, options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixGraphNode', FocusAndDirectrixGraphNode );
} );