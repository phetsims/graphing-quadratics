// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on the 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CoordinatesCheckbox = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesCheckbox' );
  const DirectrixCheckbox = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/DirectrixCheckbox' );
  const FocusCheckbox = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/FocusCheckbox' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Panel = require( 'SUN/Panel' );
  const PointOnQuadraticCheckbox = require( 'GRAPHING_QUADRATICS/focusanddirectrix/view/PointOnQuadraticCheckbox' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VertexCheckbox = require( 'GRAPHING_QUADRATICS/common/view/VertexCheckbox' );

  class FocusAndDirectrixGraphControls extends Panel {

    /**
     * @param {GQViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( viewProperties, options ) {

      options = _.extend( {
        tandem: Tandem.required
      }, GQConstants.PANEL_OPTIONS, options );

      // checkboxes
      const vertexCheckbox = new VertexCheckbox( viewProperties.vertexVisibleProperty, {
        manipulatorIcon: true,
        tandem: options.tandem.createTandem( 'vertexCheckbox' )
      } );
      const focusCheckbox = new FocusCheckbox( viewProperties.focusVisibleProperty, {
        tandem: options.tandem.createTandem( 'focusCheckbox' )
      } );
      const directrixCheckbox = new DirectrixCheckbox( viewProperties.directrixVisibleProperty, {
        tandem: options.tandem.createTandem( 'directrixCheckbox' )
      } );
      const pointOnQuadraticCheckbox = new PointOnQuadraticCheckbox( viewProperties.pointOnQuadraticVisibleProperty, {
        tandem: options.tandem.createTandem( 'pointOnQuadraticCheckbox' )
      } );
      const coordinatesCheckbox = new CoordinatesCheckbox( viewProperties.coordinatesVisibleProperty, {
        tandem: options.tandem.createTandem( 'coordinatesCheckbox' )
      } );

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: GQConstants.CHECKBOXES_Y_SPACING,
        children: [
          vertexCheckbox,
          focusCheckbox,
          directrixCheckbox,
          pointOnQuadraticCheckbox,
          coordinatesCheckbox
        ]
      } );

      super( contentNode, options );
    }
  }

  return graphingQuadratics.register( 'FocusAndDirectrixGraphControls', FocusAndDirectrixGraphControls );
} );