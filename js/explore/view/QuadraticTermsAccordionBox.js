// Copyright 2018, University of Colorado Boulder

/**
 * Accordion box for showing and hiding terms of the interactive quadratic equation.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const Checkbox = require( 'SUN/Checkbox' );
  const EquationsCheckbox = require( 'GRAPHING_QUADRATICS/common/view/EquationsCheckbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HSeparator = require( 'SUN/HSeparator' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  const CHECKBOX_EQUATION_FONT = new PhetFont( GQConstants.CHECKBOX_EQUATION_FONT_SIZE );

  // strings
  const quadraticTermsString = require( 'string!GRAPHING_QUADRATICS/quadraticTerms' );

  class QuadraticTermsAccordionBox extends AccordionBox {

    /**
     * @param {ExploreViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( viewProperties, options ) {

      options = _.extend( {
        expandedProperty: viewProperties.quadraticTermsAccordionBoxExpandedProperty,
        titleAlignX: 'left',
        titleXSpacing: 8,
        tandem: Tandem.required
      }, GQConstants.ACCORDION_BOX_OPTIONS, options );

      assert && assert( !options.titleNode, 'QuadraticTermsAccordionBox sets titleNode' );
      options.titleNode = new Text( quadraticTermsString, {
        font: new PhetFont( GQConstants.TITLE_FONT_SIZE ),
        maxWidth: 180, // determined empirically
        tandem: options.tandem.createTandem( 'titleNode' )
      } );

      // y = ax^2
      const quadraticTermLabel = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{a}}{{xSquared}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        a: GQSymbols.a,
        x: GQSymbols.x,
        xSquared: GQSymbols.xSquared
      } ), {
        font: CHECKBOX_EQUATION_FONT,
        fill: GQColors.QUADRATIC_TERM,
        maxWidth: GQConstants.CHECKBOX_TEXT_MAX_WIDTH
      } );
      const quadraticTermCheckbox = new Checkbox( quadraticTermLabel, viewProperties.quadraticTermVisibleProperty, {
        tandem: options.tandem.createTandem( 'quadraticTermCheckbox' ),
        phetioDocumentation: 'checkbox that makes the quadratic term (y = ax^2) visible'
      } );

      // y = bx
      const linearTermLabel = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{b}}{{x}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        b: GQSymbols.b,
        x: GQSymbols.x
      } ), {
        font: CHECKBOX_EQUATION_FONT,
        fill: GQColors.LINEAR_TERM,
        maxWidth: GQConstants.CHECKBOX_TEXT_MAX_WIDTH
      } );
      const linearTermCheckbox = new Checkbox( linearTermLabel, viewProperties.linearTermVisibleProperty, {
        tandem: options.tandem.createTandem( 'linearTermCheckbox' ),
        phetioDocumentation: 'checkbox that makes the linear term (y = bx) visible'
      } );

      // y = c
      const constantTermLabel = new RichText( StringUtils.fillIn( '{{y}} {{equals}} {{c}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO,
        c: GQSymbols.c
      } ), {
        font: CHECKBOX_EQUATION_FONT,
        fill: GQColors.CONSTANT_TERM,
        maxWidth: GQConstants.CHECKBOX_TEXT_MAX_WIDTH
      } );
      const constantTermCheckbox = new Checkbox( constantTermLabel, viewProperties.constantTermVisibleProperty, {
        tandem: options.tandem.createTandem( 'constantTermCheckbox' ),
        phetioDocumentation: 'checkbox that makes the constant term (y = c) visible'
      } );

      // Equations
      const equationsCheckbox = new EquationsCheckbox( viewProperties.equationsVisibleProperty, {
        tandem: options.tandem.createTandem( 'equationsCheckbox' )
      } );

      const maxCheckboxWidth = _.maxBy(
        [ quadraticTermCheckbox, linearTermCheckbox, constantTermCheckbox, equationsCheckbox ],
        node => node.width ).width;

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: GQConstants.CHECKBOXES_Y_SPACING,
        children: [
          quadraticTermCheckbox,
          linearTermCheckbox,
          constantTermCheckbox,
          new HSeparator( Math.max( maxCheckboxWidth, 200 ), { stroke: GQColors.SEPARATOR } ),
          equationsCheckbox
        ]
      } );

      super( contentNode, options );
    }
  }

  return graphingQuadratics.register( 'QuadraticTermsAccordionBox', QuadraticTermsAccordionBox );
} );