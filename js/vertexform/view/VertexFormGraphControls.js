// Copyright 2018, University of Colorado Boulder

/**
 * Controls for various features related to the graph on the 'Vertex Form' screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AxisOfSymmetryCheckbox = require( 'GRAPHING_QUADRATICS/common/view/AxisOfSymmetryCheckbox' );
  const CoordinatesCheckbox = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesCheckbox' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Panel = require( 'SUN/Panel' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VertexCheckbox = require( 'GRAPHING_QUADRATICS/common/view/VertexCheckbox' );

  class VertexFormGraphControls extends Panel {

    /**
     * @param {GQViewProperties} viewProperties
     * @param {Tandem} tandem
     */
    constructor( viewProperties, tandem ) {

      const options = _.extend( {
        tandem: tandem
      }, GQConstants.PANEL_OPTIONS );

      // checkboxes
      const vertexCheckbox = new VertexCheckbox( viewProperties.vertexVisibleProperty, {
        manipulatorIcon: true,
        tandem: tandem.createTandem( 'vertexCheckbox' )
      } );
      const axisOfSymmetryCheckbox = new AxisOfSymmetryCheckbox( viewProperties.axisOfSymmetryVisibleProperty, {
        tandem: tandem.createTandem( 'axisOfSymmetryCheckbox' )
      } );
      const coordinatesCheckbox = new CoordinatesCheckbox( viewProperties.coordinatesVisibleProperty, {
        tandem: tandem.createTandem( 'coordinatesCheckbox' )
      } );

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: GQConstants.CHECKBOXES_Y_SPACING,
        children: [
          vertexCheckbox,
          axisOfSymmetryCheckbox,
          coordinatesCheckbox
        ]
      } );

      super( contentNode, options );
    }
  }

  return graphingQuadratics.register( 'VertexFormGraphControls', VertexFormGraphControls );
} );