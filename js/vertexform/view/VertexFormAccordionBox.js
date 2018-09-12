// Copyright 2018, University of Colorado Boulder

/**
 * Accordion box in the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HSeparator = require( 'SUN/HSeparator' );
  const SaveCurveControls =  require( 'GRAPHING_QUADRATICS/common/view/SaveCurveControls' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VertexFormEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormEquationNode' );
  const VertexFormInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/vertexform/view/VertexFormInteractiveEquationNode' );

  class VertexFormAccordionBox extends AccordionBox {

    /**
     * @param {VertexFormScene} scene
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( scene, viewProperties, options ) {

      options = _.extend( {}, GQConstants.ACCORDION_BOX_OPTIONS, options );

      assert && assert( !options.titleNode, 'VertexFormAccordionBox sets titleNode' );
      options.titleNode = new VertexFormEquationNode();

      const interactiveEquationNode = new VertexFormInteractiveEquationNode(
        scene.quadraticProperty, scene.aRange, scene.hRange, scene.kRange );

      const saveCurveControls = new SaveCurveControls(
        scene.saveQuadratic.bind( scene ), scene.eraseQuadratics.bind( scene ),
        viewProperties.curvesVisibleProperty, scene.savedQuadratics.lengthProperty );

      const separatorWidth = Math.max( interactiveEquationNode.width, saveCurveControls.width );

      const separatorOptions = { stroke: GQColors.SEPARATOR };

      const content = new VBox( {
        align: 'center',
        spacing: 10,
        children: [
          new HSeparator( separatorWidth, separatorOptions ),
          interactiveEquationNode,
          new HSeparator( separatorWidth, separatorOptions ),
          saveCurveControls
        ]
      } );

      super( content, options );
    }
  }

  return graphingQuadratics.register( 'VertexFormAccordionBox', VertexFormAccordionBox );
} );