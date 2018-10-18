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
  const ConstantTermCheckbox = require( 'GRAPHING_QUADRATICS/explore/view/ConstantTermCheckbox' );
  const EquationsCheckbox = require( 'GRAPHING_QUADRATICS/common/view/EquationsCheckbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HSeparator = require( 'SUN/HSeparator' );
  const LinearTermCheckbox = require( 'GRAPHING_QUADRATICS/explore/view/LinearTermCheckbox' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const QuadraticTermCheckbox = require( 'GRAPHING_QUADRATICS/explore/view/QuadraticTermCheckbox' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const quadraticTermsString = require( 'string!GRAPHING_QUADRATICS/quadraticTerms' );

  class QuadraticTermsAccordionBox extends AccordionBox {

    /**
     * @param {ExploreViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( viewProperties, options ) {

      options = _.extend( {

        // AccordionBox options
        titleAlignX: 'left',
        titleXSpacing: 8,
        tandem: Tandem.required
      }, GQConstants.ACCORDION_BOX_OPTIONS, options );

      // AccordionBox title
      assert && assert( !options.titleNode, 'QuadraticTermsAccordionBox sets titleNode' );
      options.titleNode = new Text( quadraticTermsString, {
        font: new PhetFont( GQConstants.TITLE_FONT_SIZE ),
        maxWidth: 180, // determined empirically
        tandem: options.tandem.createTandem( 'titleNode' ),
        phetioDocumentation: 'the title on this accordion box'
      } );

      // y = ax^2
      const quadraticTermCheckbox = new QuadraticTermCheckbox( viewProperties.quadraticTermVisibleProperty, {
        tandem: options.tandem.createTandem( 'quadraticTermCheckbox' ),
        phetioDocumentation: 'checkbox that makes the quadratic term (y = ax^2) visible the graph'
      } );

      // y = bx
      const linearTermCheckbox = new LinearTermCheckbox( viewProperties.linearTermVisibleProperty, {
        tandem: options.tandem.createTandem( 'linearTermCheckbox' ),
        phetioDocumentation: 'checkbox that makes the linear term (y = bx) visible on the graph'
      } );

      // y = c
      const constantTermCheckbox = new ConstantTermCheckbox( viewProperties.constantTermVisibleProperty, {
        tandem: options.tandem.createTandem( 'constantTermCheckbox' ),
        phetioDocumentation: 'checkbox that makes the constant term (y = c) visible on the graph'
      } );

      // Equations
      const equationsCheckbox = new EquationsCheckbox( viewProperties.equationsVisibleProperty, {
        tandem: options.tandem.createTandem( 'equationsCheckbox' ),
        phetioDocumentation: 'checkbox that shows equations on graphed curves'
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