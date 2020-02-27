// Copyright 2014-2018, University of Colorado Boulder

/**
 * View for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import GQScreenView from '../../common/view/GQScreenView.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import StandardFormEquationAccordionBox from './StandardFormEquationAccordionBox.js';
import StandardFormGraphControlPanel from './StandardFormGraphControlPanel.js';
import StandardFormGraphNode from './StandardFormGraphNode.js';
import StandardFormViewProperties from './StandardFormViewProperties.js';

class StandardFormScreenView extends GQScreenView {

  /**
   * @param {StandardFormModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    const options = {

      // phet-io
      tandem: tandem
    };

    const viewProperties = new StandardFormViewProperties( {
      tandem: options.tandem.createTandem( 'viewProperties' )
    } );

    super( model,
      viewProperties,
      new StandardFormGraphNode( model, viewProperties, tandem ),
      new StandardFormEquationAccordionBox( model, {
        expandedProperty: viewProperties.equationAccordionBoxExpandedProperty,
        tandem: options.tandem.createTandem( 'equationAccordionBox' )
      } ),
      new StandardFormGraphControlPanel( viewProperties, {
        tandem: options.tandem.createTandem( 'graphControlPanel' )
      } ),
      options
    );
  }
}

graphingQuadratics.register( 'StandardFormScreenView', StandardFormScreenView );
export default StandardFormScreenView;