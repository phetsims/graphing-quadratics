// Copyright 2018, University of Colorado Boulder

/**
 * Accordion box in the 'Standard Form' screen.
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
  const StandardFormEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormEquationNode' );
  const StandardFormInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/standardform/view/StandardFormInteractiveEquationNode' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class StandardFormAccordionBox extends AccordionBox {

    /**
     * @param {StandardFormModel} model
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( model, viewProperties, options ) {

      options = _.extend( {}, GQConstants.ACCORDION_BOX_OPTIONS, options );

      assert && assert( !options.titleNode, 'StandardFormAccordionBox sets titleNode' );
      options.titleNode = new StandardFormEquationNode();

      const interactiveEquationNode = new StandardFormInteractiveEquationNode(
        model.quadraticProperty, model.aRange, model.bRange, model.cRange );

      const saveCurveControls = new SaveCurveControls(
        model.saveQuadratic.bind( model ), model.eraseQuadratics.bind( model ),
        viewProperties.curvesVisibleProperty, model.savedQuadratics.lengthProperty );

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

  return graphingQuadratics.register( 'StandardFormAccordionBox', StandardFormAccordionBox );
} );