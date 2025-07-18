// Copyright 2018-2025, University of Colorado Boulder

/**
 * Panel that contains controls for various features related to the graph on the 'Focus and Directrix' screen.
 *
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
import FocusAndDirectrixViewProperties from './FocusAndDirectrixViewProperties.js';

export default class FocusAndDirectrixGraphControlPanel extends Panel {

  public constructor( viewProperties: FocusAndDirectrixViewProperties, tandem: Tandem ) {

    const options = combineOptions<PanelOptions>( {}, GQConstants.PANEL_OPTIONS, {
      isDisposable: false,
      tandem: tandem,
      phetioDocumentation: 'panel that contains controls related to the graph',
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    const coordinatesVisibleProperty = viewProperties.coordinatesVisibleProperty!;
    assert && assert( coordinatesVisibleProperty );
    const vertexVisibleProperty = viewProperties.vertexVisibleProperty!;
    assert && assert( vertexVisibleProperty );

    // checkboxes
    const vertexCheckbox = GQCheckbox.createVertexManipulatorCheckbox( vertexVisibleProperty,
      tandem.createTandem( 'vertexCheckbox' ) );
    const focusCheckbox = GQCheckbox.createFocusCheckbox( viewProperties.focusVisibleProperty,
      tandem.createTandem( 'focusCheckbox' ) );
    const directrixCheckbox = GQCheckbox.createDirectrixCheckbox( viewProperties.directrixVisibleProperty,
      tandem.createTandem( 'directrixCheckbox' ) );
    const pointOnParabolaCheckbox = GQCheckbox.createPointOnParabolaCheckbox( viewProperties.pointOnParabolaVisibleProperty,
      tandem.createTandem( 'pointOnParabolaCheckbox' ) );
    const equationsCheckbox = GQCheckbox.createEquationsCheckbox( viewProperties.equationsVisibleProperty,
      tandem.createTandem( 'equationsCheckbox' ) );
    const coordinatesCheckbox = GQCheckbox.createCoordinatesCheckbox( coordinatesVisibleProperty,
      tandem.createTandem( 'coordinatesCheckbox' ) );

    // vertical layout
    const contentNode = new VBox( {
      align: 'left',
      stretch: true, // See https://github.com/phetsims/graphing-quadratics/issues/197
      spacing: GQConstants.CHECKBOXES_Y_SPACING,
      children: [
        vertexCheckbox,
        focusCheckbox,
        directrixCheckbox,
        pointOnParabolaCheckbox,
        new HSeparator( { stroke: GQColors.separatorStrokeProperty } ),
        equationsCheckbox,
        coordinatesCheckbox
      ]
    } );

    super( contentNode, options );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixGraphControlPanel', FocusAndDirectrixGraphControlPanel );