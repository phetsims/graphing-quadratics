// Copyright 2018, University of Colorado Boulder

/**
 * Panel that contains controls for various features related to the graph on the 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CoordinatesCheckbox = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesCheckbox' );
  const DirectrixCheckbox = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/DirectrixCheckbox' );
  const EquationsCheckbox = require( 'GRAPHING_QUADRATICS/common/view/EquationsCheckbox' );
  const FocusCheckbox = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusCheckbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HSeparator = require( 'SUN/HSeparator' );
  const Panel = require( 'SUN/Panel' );
  const PointOnParabolaCheckbox = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/PointOnParabolaCheckbox' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VertexCheckbox = require( 'GRAPHING_QUADRATICS/common/view/VertexCheckbox' );

  class FocusAndDirectrixGraphControlPanel extends Panel {

    /**
     * @param {FocusAndDirectrixViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( viewProperties, options ) {

      options = _.extend( {

        // phet-io
        tandem: Tandem.required,
        phetioDocumentation: 'panel that contains controls related to the graph'

      }, GQConstants.PANEL_OPTIONS, options );

      // checkboxes
      const vertexCheckbox = new VertexCheckbox( viewProperties.vertexVisibleProperty, {
        tandem: options.tandem.createTandem( 'vertexCheckbox' )
      } );
      const focusCheckbox = new FocusCheckbox( viewProperties.focusVisibleProperty, {
        tandem: options.tandem.createTandem( 'focusCheckbox' )
      } );
      const directrixCheckbox = new DirectrixCheckbox( viewProperties.directrixVisibleProperty, {
        tandem: options.tandem.createTandem( 'directrixCheckbox' )
      } );
      const pointOnParabolaCheckbox = new PointOnParabolaCheckbox( viewProperties.pointOnParabolaVisibleProperty, {
        tandem: options.tandem.createTandem( 'pointOnParabolaCheckbox' )
      } );
      const equationsCheckbox = new EquationsCheckbox( viewProperties.equationsVisibleProperty, {
        tandem: options.tandem.createTandem( 'equationsCheckbox' )
      } );
      const coordinatesCheckbox = new CoordinatesCheckbox( viewProperties.coordinatesVisibleProperty, {
        tandem: options.tandem.createTandem( 'coordinatesCheckbox' )
      } );

      const maxCheckboxWidth = _.maxBy(
        [ vertexCheckbox, focusCheckbox, directrixCheckbox, pointOnParabolaCheckbox, equationsCheckbox, coordinatesCheckbox ],
        node => node.width ).width;

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: GQConstants.CHECKBOXES_Y_SPACING,
        children: [
          vertexCheckbox,
          focusCheckbox,
          directrixCheckbox,
          pointOnParabolaCheckbox,
          new HSeparator( maxCheckboxWidth, { stroke: GQColors.SEPARATOR } ),
          equationsCheckbox,
          coordinatesCheckbox
        ]
      } );

      super( contentNode, options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixGraphControlPanel', FocusAndDirectrixGraphControlPanel );
} );