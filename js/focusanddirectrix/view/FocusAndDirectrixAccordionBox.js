// Copyright 2018, University of Colorado Boulder

/**
 * Accordion box in the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const FocusAndDirectrixEquationNode = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixEquationNode' );
  const FocusAndDirectrixInteractiveEquationNode = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusAndDirectrixInteractiveEquationNode' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HSeparator = require( 'SUN/HSeparator' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class FocusAndDirectrixAccordionBox extends AccordionBox {

    /**
     * @param {VertexFormModel} model
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( model, viewProperties, options ) {

      options = _.extend( {}, GQConstants.ACCORDION_BOX_OPTIONS, options );

      assert && assert( !options.titleNode, 'FocusAndDirectrixAccordionBox sets titleNode' );
      options.titleNode = new FocusAndDirectrixEquationNode();

      const interactiveEquationNode = new FocusAndDirectrixInteractiveEquationNode(
        model.quadraticProperty, model.hRange, model.pRange, model.kRange );

      const content = new VBox( {
        align: 'center',
        spacing: 10,
        children: [
          new HSeparator( interactiveEquationNode.width, { stroke: GQColors.SEPARATOR } ),
          interactiveEquationNode
        ]
      } );

      super( content, options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixAccordionBox', FocusAndDirectrixAccordionBox );
} );