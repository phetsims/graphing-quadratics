// Copyright 2018, University of Colorado Boulder

/**
 * Abstract base type for accordion box that displays the interactive equation and related controls.
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
  const SaveCurveControls = require( 'GRAPHING_QUADRATICS/common/view/SaveCurveControls' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class EquationAccordionBox extends AccordionBox {

    /**
     * @param {ExploreModel} model
     * @param {BooleanProperty} expandedProperty
     * @param {Node} titleNode
     * @param {Node} interactiveEquationNode
     * @param {Tandem} tandem
     * @abstract
     */
    constructor( model, expandedProperty, titleNode, interactiveEquationNode, tandem ) {

      const options = _.extend( {
        expandedProperty: expandedProperty,
        titleNode: titleNode,
        tandem: tandem
      }, GQConstants.ACCORDION_BOX_OPTIONS );

      const saveCurveControls = new SaveCurveControls(
        model.saveQuadratic.bind( model ), model.eraseQuadratics.bind( model ), model.savedQuadratics.lengthProperty );

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

  return graphingQuadratics.register( 'EquationAccordionBox', EquationAccordionBox );
} );