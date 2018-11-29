// Copyright 2018, University of Colorado Boulder

/**
 * Abstract base class for the accordion box that displays the interactive equation and related controls.
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
  const SaveEraseButtonGroup = require( 'GRAPHING_QUADRATICS/common/view/SaveEraseButtonGroup' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class GQEquationAccordionBox extends AccordionBox {

    /**
     * @param {ExploreModel} model
     * @param {Node} interactiveEquationNode
     * @param {Object} [options]
     * @abstract
     */
    constructor( model, interactiveEquationNode, options ) {

      options = _.extend( {

        // phet-io
        tandem: Tandem.required,
        phetioDocumentation: 'the accordion box that contains the interactive equation',
        phetioComponentOptions: { visibleProperty: { phetioFeatured: true } }
      }, GQConstants.ACCORDION_BOX_OPTIONS, options );

      const buttonGroup = new SaveEraseButtonGroup(
        model.saveQuadratic.bind( model ),
        model.eraseQuadratic.bind( model ),
        model.savedQuadraticProperty, {
          tandem: options.tandem.createTandem( 'buttonGroup' ),
          phetioDocumentation: 'buttons that appear below the interactive equation',
          phetioComponentOptions: { visibleProperty: { phetioFeatured: true } }
        } );

      // properties of the horizontal separators
      const separatorWidth = Math.max( interactiveEquationNode.width, buttonGroup.width );
      const separatorOptions = { stroke: GQColors.SEPARATOR };

      const contentNode = new VBox( {
        align: 'center',
        spacing: 8,
        children: [
          new HSeparator( separatorWidth, separatorOptions ),
          interactiveEquationNode,
          new HSeparator( separatorWidth, separatorOptions ),
          buttonGroup
        ]
      } );

      super( contentNode, options );
    }
  }

  return graphingQuadratics.register( 'GQEquationAccordionBox', GQEquationAccordionBox );
} );