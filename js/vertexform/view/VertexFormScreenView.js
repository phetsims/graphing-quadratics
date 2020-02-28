// Copyright 2014-2020, University of Colorado Boulder

/**
 * View for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import GQScreenView from '../../common/view/GQScreenView.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import VertexFormEquationAccordionBox from './VertexFormEquationAccordionBox.js';
import VertexFormGraphControlPanel from './VertexFormGraphControlPanel.js';
import VertexFormGraphNode from './VertexFormGraphNode.js';
import VertexFormViewProperties from './VertexFormViewProperties.js';

class VertexFormScreenView extends GQScreenView {

  /**
   * @param {VertexFormModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    const options = {

      // phet-io
      tandem: tandem
    };

    const viewProperties = new VertexFormViewProperties( {
      tandem: options.tandem.createTandem( 'viewProperties' )
    } );

    super( model,
      viewProperties,
      new VertexFormGraphNode( model, viewProperties, tandem ),
      new VertexFormEquationAccordionBox( model, {
        expandedProperty: viewProperties.equationAccordionBoxExpandedProperty,
        tandem: options.tandem.createTandem( 'equationAccordionBox' )
      } ),
      new VertexFormGraphControlPanel( viewProperties, {
        tandem: options.tandem.createTandem( 'graphControlPanel' )
      } ),
      options
    );
  }
}

graphingQuadratics.register( 'VertexFormScreenView', VertexFormScreenView );
export default VertexFormScreenView;