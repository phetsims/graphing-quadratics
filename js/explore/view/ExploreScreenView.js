// Copyright 2018, University of Colorado Boulder

/**
 * View for the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import GQScreenView from '../../common/view/GQScreenView.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import ExploreEquationAccordionBox from './ExploreEquationAccordionBox.js';
import ExploreGraphNode from './ExploreGraphNode.js';
import ExploreViewProperties from './ExploreViewProperties.js';
import QuadraticTermsAccordionBox from './QuadraticTermsAccordionBox.js';

class ExploreScreenView extends GQScreenView {

  /**
   * @param {ExploreModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    const options = {

      // phet-io
      tandem: tandem
    };

    const viewProperties = new ExploreViewProperties( {
      tandem: tandem.createTandem( 'viewProperties' )
    } );

    super( model,
      viewProperties,
      new ExploreGraphNode( model, viewProperties ), // do not instrument for PhET-iO
      new ExploreEquationAccordionBox( model, {
        expandedProperty: viewProperties.equationAccordionBoxExpandedProperty,
        tandem: tandem.createTandem( 'equationAccordionBox' )
      } ),
      new QuadraticTermsAccordionBox( viewProperties, {
        expandedProperty: viewProperties.quadraticTermsAccordionBoxExpandedProperty,
        tandem: tandem.createTandem( 'quadraticTermsAccordionBox' )
      } ),
      options
    );
  }
}

graphingQuadratics.register( 'ExploreScreenView', ExploreScreenView );
export default ExploreScreenView;