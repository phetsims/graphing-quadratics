// Copyright 2018, University of Colorado Boulder

/**
 * Accordion box for showing and hiding terms of the interactive auadratic equation.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const Checkbox = require( 'SUN/Checkbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const CHECKBOX_EQUATION_FONT = new PhetFont( GQConstants.CHECKBOX_EQUATION_FONT_SIZE );

  // strings
  const quadraticTermsString = require( 'string!GRAPHING_QUADRATICS/quadraticTerms' );

  class TermsAccordionBox extends AccordionBox {

    /**
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( viewProperties, options ) {

      options = _.extend( {
        expandedProperty: viewProperties.termsAccordionBoxExpandedProperty,
        titleAlignX: 'left',
        titleXSpacing: 8
      }, GQConstants.ACCORDION_BOX_OPTIONS, options );

      assert && assert( !options.titleNode, 'TermsAccordionBox sets titleNode' );
      options.titleNode = new Text( quadraticTermsString, {
        font: new PhetFont( GQConstants.TITLE_FONT_SIZE )
      } );

      // y = ax^2, dispose not needed
      const quadraticTermLabel = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{a}}{{xSquared}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        a: GQSymbols.a,
        x: GQSymbols.x,
        xSquared: GQSymbols.xSquared
      } ), {
        font: CHECKBOX_EQUATION_FONT,
        fill: GQColors.QUADRATIC_TERM
      } );
      const quadraticTermCheckbox = new Checkbox( quadraticTermLabel, viewProperties.quadraticTermVisibleProperty );

      // y = bx, dispose not needed
      const linearTermLabel = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{b}}{{x}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        b: GQSymbols.b,
        x: GQSymbols.x
      } ), {
        font: CHECKBOX_EQUATION_FONT,
        fill: GQColors.LINEAR_TERM
      } );
      const linearTermCheckbox = new Checkbox( linearTermLabel, viewProperties.linearTermVisibleProperty );

      // y = c, dispose not needed
      const constantTermLabel = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{c}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        c: GQSymbols.c
      } ), {
        font: CHECKBOX_EQUATION_FONT,
        fill: GQColors.CONSTANT_TERM
      } );
      const constantTermCheckbox = new Checkbox( constantTermLabel, viewProperties.constantTermVisibleProperty );

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: 20,
        children: [
          quadraticTermCheckbox,
          linearTermCheckbox,
          constantTermCheckbox
        ]
      } );

      super( contentNode, options );

      // Disable other controls when 'Hide curves' is checked
      viewProperties.curvesVisibleProperty.link( curvesVisible => {
        quadraticTermCheckbox.enabled = curvesVisible;
        linearTermCheckbox.enabled = curvesVisible;
        constantTermCheckbox.enabled = curvesVisible;
      } );
    }
  }

  return graphingQuadratics.register( 'TermsAccordionBox', TermsAccordionBox );
} );