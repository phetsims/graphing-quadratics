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
     * @param {Node} content
     * @param {Object} [options]
     * @abstract
     */
    constructor( model, content, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, GQConstants.ACCORDION_BOX_OPTIONS, options );

      const saveEraseButtonGroup = new SaveEraseButtonGroup(
        model.saveQuadratic.bind( model ), 
        model.eraseQuadratic.bind( model ),
        model.savedQuadraticProperty, {
          tandem: options.tandem.createTandem( 'saveEraseButtonGroup' ),
          phetioDocumentation: 'buttons to save and erase a quadratic on the graph'
        } );

      const separatorWidth = Math.max( content.width, saveEraseButtonGroup.width );

      const separatorOptions = { stroke: GQColors.SEPARATOR };

      const vBox = new VBox( {
        align: 'center',
        spacing: 8,
        children: [
          new HSeparator( separatorWidth, separatorOptions ),
          content,
          new HSeparator( separatorWidth, separatorOptions ),
          saveEraseButtonGroup
        ]
      } );

      super( vBox, options );
    }
  }

  return graphingQuadratics.register( 'GQEquationAccordionBox', GQEquationAccordionBox );
} );