// Copyright 2018, University of Colorado Boulder

/**
 * Accordion box that contains the interactive equation and associated controls.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HSeparator = require( 'SUN/HSeparator' );
  const SaveCurveControls =  require( 'GRAPHING_QUADRATICS/common/view/SaveCurveControls' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const SEPARATOR_OPTIONS = { stroke: 'rgb( 212, 212, 212 )' };
  
  class EquationAccordionBox extends AccordionBox {

    /**
     * @param {Node} interactiveEquationNode - interactive equation
     * @param {function} saveFunction
     * @param {function} eraseFunction
     * @param {BooleanProperty} curvesVisibleProperty
     * @param {NumberProperty} numberOfSavedLinesProperty
     * @param {Object} [options]
     */
    constructor( interactiveEquationNode, saveFunction, eraseFunction,
                 curvesVisibleProperty, numberOfSavedLinesProperty, options ) {

      options = _.extend( {}, GQConstants.ACCORDION_BOX_OPTIONS, options );

      const saveCurveControls = new SaveCurveControls( saveFunction, eraseFunction, curvesVisibleProperty, numberOfSavedLinesProperty );

      const content = new VBox( {
        align: 'center',
        spacing: 10,
        children: [
          new HSeparator( interactiveEquationNode.width, SEPARATOR_OPTIONS ),
          interactiveEquationNode,
          new HSeparator( interactiveEquationNode.width, SEPARATOR_OPTIONS ),
          saveCurveControls
        ]
      } );

      super( content, options );
    }
  }

  return graphingQuadratics.register( 'EquationAccordionBox', EquationAccordionBox );
} );