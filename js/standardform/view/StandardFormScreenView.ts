// Copyright 2014-2025, University of Colorado Boulder

/**
 * StandardFormScreenView is the view for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import GQScreenView, { GQScreenViewOptions } from '../../common/view/GQScreenView.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import StandardFormModel from '../model/StandardFormModel.js';
import StandardFormEquationAccordionBox from './StandardFormEquationAccordionBox.js';
import StandardFormGraphControlPanel from './StandardFormGraphControlPanel.js';
import StandardFormGraphNode from './StandardFormGraphNode.js';
import StandardFormViewProperties from './StandardFormViewProperties.js';
import StandardFormScreenSummaryContent from '../description/StandardFormScreenSummaryContent.js';

export default class StandardFormScreenView extends GQScreenView {

  public constructor( model: StandardFormModel, tandem: Tandem ) {

    const viewProperties = new StandardFormViewProperties( tandem.createTandem( 'viewProperties' ) );

    const options: GQScreenViewOptions = {
      screenSummaryContent: new StandardFormScreenSummaryContent( viewProperties.graphContentsVisibleProperty ),
      tandem: tandem
    };

    super( model,
      viewProperties,
      new StandardFormGraphNode( model, viewProperties, tandem.createTandem( 'graphNode' ) ),
      new StandardFormEquationAccordionBox( model, {
        expandedProperty: viewProperties.equationAccordionBoxExpandedProperty,
        tandem: tandem.createTandem( 'equationAccordionBox' )
      } ),
      new StandardFormGraphControlPanel( viewProperties, tandem.createTandem( 'graphControlPanel' ) ),
      options
    );
  }
}

graphingQuadratics.register( 'StandardFormScreenView', StandardFormScreenView );