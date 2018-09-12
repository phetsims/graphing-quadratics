// Copyright 2018, University of Colorado Boulder

/**
 * Accordion box in the 'Decimals' scene of the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HSeparator = require( 'SUN/HSeparator' );
  const DecimalsInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/DecimalsInteractiveEquationNode' );
  const SaveCurveControls =  require( 'GRAPHING_QUADRATICS/common/view/SaveCurveControls' );
  const StandardFormEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationNode' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const SEPARATOR_OPTIONS = { stroke: 'rgb( 212, 212, 212 )' };
  
  class DecimalsAccordionBox extends AccordionBox {

    /**
     * @param {StandardFormScene} scene
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( scene, viewProperties, options ) {

      options = _.extend( {}, GQConstants.ACCORDION_BOX_OPTIONS, options );

      assert && assert( !options.titleNode, 'DecimalsAccordionBox sets titleNode' );
      options.titleNode = new StandardFormEquationNode();

      const interactiveEquationNode = new DecimalsInteractiveEquationNode(
        scene.quadraticProperty, scene.aRange, scene.bRange, scene.cRange );

      const saveCurveControls = new SaveCurveControls(
        scene.saveQuadratic.bind( scene ), scene.eraseQuadratics.bind( scene ),
        viewProperties.curvesVisibleProperty, scene.savedQuadratics.lengthProperty );

      const separatorWidth = Math.max( interactiveEquationNode.width, saveCurveControls.width );

      const content = new VBox( {
        align: 'center',
        spacing: 10,
        children: [
          new HSeparator( separatorWidth, SEPARATOR_OPTIONS ),
          interactiveEquationNode,
          new HSeparator( separatorWidth, SEPARATOR_OPTIONS ),
          saveCurveControls
        ]
      } );

      super( content, options );
    }
  }

  return graphingQuadratics.register( 'DecimalsAccordionBox', DecimalsAccordionBox );
} );