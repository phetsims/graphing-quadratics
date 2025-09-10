// Copyright 2018-2025, University of Colorado Boulder

/**
 * StandardFormGraphControlPanel is the panel that contains controls for various features related to the graph on
 * the 'Standard Form' screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { combineOptions } from '../../../../phet-core/js/optionize.js';
import HSeparator from '../../../../scenery/js/layout/nodes/HSeparator.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQCheckbox from '../../common/view/GQCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import StandardFormViewProperties from './StandardFormViewProperties.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';

export default class StandardFormGraphControlPanel extends Panel {

  public constructor( viewProperties: StandardFormViewProperties, tandem: Tandem ) {

    const options = combineOptions<PanelOptions>( {}, GQConstants.PANEL_OPTIONS, {
      isDisposable: false,
      accessibleHeading: GraphingQuadraticsStrings.a11y.accessibleHeadings.parabolaFeaturesHeadingStringProperty,
      tandem: tandem,
      phetioDocumentation: 'panel that contains controls related to the graph',
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    // checkboxes
    const vertexCheckbox = GQCheckbox.createVertexPointCheckbox( viewProperties.vertexVisibleProperty,
      tandem.createTandem( 'vertexCheckbox' ) );
    const axisOfSymmetryCheckbox = GQCheckbox.createAxisOfSymmetryCheckbox(
      viewProperties.axisOfSymmetryVisibleProperty, tandem.createTandem( 'axisOfSymmetryCheckbox' ) );
    const rootsCheckbox = GQCheckbox.createRootsCheckbox( viewProperties.rootsVisibleProperty,
      tandem.createTandem( 'rootsCheckbox' ) );
    const equationsCheckbox = GQCheckbox.createEquationsCheckbox( viewProperties.equationsVisibleProperty,
      tandem.createTandem( 'equationsCheckbox' ) );
    const coordinatesCheckbox = GQCheckbox.createCoordinatesCheckbox( viewProperties.coordinatesVisibleProperty,
      tandem.createTandem( 'coordinatesCheckbox' ) );

    // vertical layout
    const contentNode = new VBox( {
      align: 'left',
      stretch: true, // See https://github.com/phetsims/graphing-quadratics/issues/197
      spacing: GQConstants.CHECKBOXES_Y_SPACING,
      children: [
        vertexCheckbox,
        axisOfSymmetryCheckbox,
        rootsCheckbox,
        new HSeparator( { stroke: GQColors.separatorStrokeProperty } ),
        equationsCheckbox,
        coordinatesCheckbox
      ]
    } );

    super( contentNode, options );
  }
}

graphingQuadratics.register( 'StandardFormGraphControlPanel', StandardFormGraphControlPanel );