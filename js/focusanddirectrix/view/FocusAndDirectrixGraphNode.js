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
     * @param {Object} [options]
     */
    constructor( model, viewProperties, options ) {

      options = options || {};

      // Directrix
      const directrixNode = new DirectrixNode(
        model.quadraticProperty,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.directrixVisibleProperty,
        viewProperties.equationsVisibleProperty
      );

      // Vertex manipulator
      const vertexManipulator = new VertexManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.hRange,
        model.kRange,
        model.modelViewTransform,
        viewProperties.vertexVisibleProperty,
        viewProperties.coordinatesVisibleProperty
      );

      // Focus manipulator
      const focusNode = new FocusManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.pRange,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.focusVisibleProperty,
        viewProperties.coordinatesVisibleProperty
      );

      // Point on Quadratic manipulator
      const pointOnQuadraticManipulator = new PointOnQuadraticManipulator(
        model.modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
        model.quadraticProperty,
        model.pointOnQuadraticProperty,
        model.graph.xRange,
        model.graph.yRange,
        model.modelViewTransform,
        viewProperties.pointOnQuadraticVisibleProperty,
        viewProperties.coordinatesVisibleProperty
      );

      // Lines that connect the point on the quadratic to the focus and directrix
      const pointOnQuadraticLinesNode = new PointOnQuadraticLinesNode(
        model.quadraticProperty,
        model.pointOnQuadraticProperty,
        model.modelViewTransform,
        viewProperties.pointOnQuadraticVisibleProperty,
        viewProperties.focusVisibleProperty,
        viewProperties.directrixVisibleProperty
        );

      assert && assert( !options.specialLines, 'FocusAndDirectrixGraphNode sets specialLines' );
      options.specialLines = [ directrixNode, pointOnQuadraticLinesNode ];

      assert && assert( !options.decorations, 'FocusAndDirectrixGraphNode sets decorations' );
      options.decorations = [ vertexManipulator, focusNode, pointOnQuadraticManipulator ];

      super( model, viewProperties.graphContentsVisibleProperty, viewProperties.equationForm, options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixGraphNode', FocusAndDirectrixGraphNode );
} );