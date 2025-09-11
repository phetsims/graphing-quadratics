// Copyright 2018-2025, University of Colorado Boulder

/**
 * FocusAndDirectrixScreenView is the view for the 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import GQScreenView, { GQScreenViewOptions } from '../../common/view/GQScreenView.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import FocusAndDirectrixModel from '../model/FocusAndDirectrixModel.js';
import FocusAndDirectrixEquationAccordionBox from './FocusAndDirectrixEquationAccordionBox.js';
import FocusAndDirectrixGraphControlPanel from './FocusAndDirectrixGraphControlPanel.js';
import FocusAndDirectrixGraphNode from './FocusAndDirectrixGraphNode.js';
import FocusAndDirectrixViewProperties from './FocusAndDirectrixViewProperties.js';
import FocusAndDirectrixScreenSummaryContent from './description/FocusAndDirectrixScreenSummaryContent.js';

export default class FocusAndDirectrixScreenView extends GQScreenView {

  public constructor( model: FocusAndDirectrixModel, tandem: Tandem ) {

    const viewProperties = new FocusAndDirectrixViewProperties( tandem.createTandem( 'viewProperties' ) );

    const options: GQScreenViewOptions = {
      screenSummaryContent: new FocusAndDirectrixScreenSummaryContent( viewProperties.graphContentsVisibleProperty ),
      tandem: tandem
    };

    super( model,
      viewProperties,
      new FocusAndDirectrixGraphNode( model, viewProperties, tandem.createTandem( 'graphNode' ) ),
      new FocusAndDirectrixEquationAccordionBox( model, {
        expandedProperty: viewProperties.equationAccordionBoxExpandedProperty,
        tandem: tandem.createTandem( 'equationAccordionBox' )
      } ),
      new FocusAndDirectrixGraphControlPanel( viewProperties, tandem.createTandem( 'graphControlPanel' ) ),
      options
    );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixScreenView', FocusAndDirectrixScreenView );