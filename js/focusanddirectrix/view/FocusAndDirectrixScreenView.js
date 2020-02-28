// Copyright 2018-2020, University of Colorado Boulder

/**
 * View for the 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import GQScreenView from '../../common/view/GQScreenView.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import FocusAndDirectrixEquationAccordionBox from './FocusAndDirectrixEquationAccordionBox.js';
import FocusAndDirectrixGraphControlPanel from './FocusAndDirectrixGraphControlPanel.js';
import FocusAndDirectrixGraphNode from './FocusAndDirectrixGraphNode.js';
import FocusAndDirectrixViewProperties from './FocusAndDirectrixViewProperties.js';

class FocusAndDirectrixScreenView extends GQScreenView {

  /**
   * @param {FocusAndDirectrixModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    const options = {

      // phet-io
      tandem: tandem
    };

    const viewProperties = new FocusAndDirectrixViewProperties( {
      tandem: options.tandem.createTandem( 'viewProperties' )
    } );

    super( model,
      viewProperties,
      new FocusAndDirectrixGraphNode( model, viewProperties, tandem ),
      new FocusAndDirectrixEquationAccordionBox( model, {
        expandedProperty: viewProperties.equationAccordionBoxExpandedProperty,
        tandem: options.tandem.createTandem( 'equationAccordionBox' )
      } ),
      new FocusAndDirectrixGraphControlPanel( viewProperties, {
        tandem: options.tandem.createTandem( 'graphControlPanel' )
      } ),
      options
    );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixScreenView', FocusAndDirectrixScreenView );
export default FocusAndDirectrixScreenView;