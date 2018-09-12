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
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HSeparator = require( 'SUN/HSeparator' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const SEPARATOR_OPTIONS = { stroke: 'rgb( 212, 212, 212 )' };
  
  class FocusAndDirectrixAccordionBox extends AccordionBox {

    /**
     * @param {VertexFormScene} scene
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( scene, viewProperties, options ) {

      options = _.extend( {}, GQConstants.ACCORDION_BOX_OPTIONS, options );

      assert && assert( !options.titleNode, 'FocusAndDirectrixAccordionBox sets titleNode' );
      options.titleNode = new FocusAndDirectrixEquationNode();

      const interactiveEquationNode = new FocusAndDirectrixInteractiveEquationNode(
        scene.quadraticProperty, scene.hRange, scene.pRange, scene.kRange );

      const content = new VBox( {
        align: 'center',
        spacing: 10,
        children: [
          new HSeparator( interactiveEquationNode.width, SEPARATOR_OPTIONS ),
          interactiveEquationNode
        ]
      } );

      super( content, options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixAccordionBox', FocusAndDirectrixAccordionBox );
} );