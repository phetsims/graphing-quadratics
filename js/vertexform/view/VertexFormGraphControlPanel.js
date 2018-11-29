// Copyright 2018, University of Colorado Boulder

/**
 * Panel that contains controls for various features related to the graph on the 'Vertex Form' screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AxisOfSymmetryCheckbox = require( 'GRAPHING_QUADRATICS/common/view/AxisOfSymmetryCheckbox' );
  const CoordinatesCheckbox = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesCheckbox' );
  const EquationsCheckbox = require( 'GRAPHING_QUADRATICS/common/view/EquationsCheckbox' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HSeparator = require( 'SUN/HSeparator' );
  const Panel = require( 'SUN/Panel' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VertexCheckbox = require( 'GRAPHING_QUADRATICS/common/view/VertexCheckbox' );

  class VertexFormGraphControlPanel extends Panel {

    /**
     * @param {VertexFormViewProperties} viewProperties
     * @param {Object} [options]
     */
    constructor( viewProperties, options ) {

      options = _.extend( {

        // phet-io
        tandem: Tandem.required,
        phetioDocumentation: 'panel that contains controls related to the graph',
        phetioComponentOptions: { visibleProperty: { phetioFeatured: true } }

      }, GQConstants.PANEL_OPTIONS, options );

      // checkboxes
      const vertexCheckbox = new VertexCheckbox( viewProperties.vertexVisibleProperty, {
        tandem: options.tandem.createTandem( 'vertexCheckbox' )
      } );
      const axisOfSymmetryCheckbox = new AxisOfSymmetryCheckbox( viewProperties.axisOfSymmetryVisibleProperty, {
        tandem: options.tandem.createTandem( 'axisOfSymmetryCheckbox' )
      } );
      const equationsCheckbox = new EquationsCheckbox( viewProperties.equationsVisibleProperty, {
        tandem: options.tandem.createTandem( 'equationsCheckbox' )
      } );
      const coordinatesCheckbox = new CoordinatesCheckbox( viewProperties.coordinatesVisibleProperty, {
        tandem: options.tandem.createTandem( 'coordinatesCheckbox' )
      } );

      const maxCheckboxWidth = _.maxBy(
        [ vertexCheckbox, axisOfSymmetryCheckbox, equationsCheckbox, coordinatesCheckbox ],
        node => node.width ).width;

      // vertical layout
      const contentNode = new VBox( {
        align: 'left',
        spacing: GQConstants.CHECKBOXES_Y_SPACING,
        children: [
          vertexCheckbox,
          axisOfSymmetryCheckbox,
          new HSeparator( maxCheckboxWidth, { stroke: GQColors.SEPARATOR } ),
          equationsCheckbox,
          coordinatesCheckbox
        ]
      } );

      super( contentNode, options );
    }
  }

  return graphingQuadratics.register( 'VertexFormGraphControlPanel', VertexFormGraphControlPanel );
} );