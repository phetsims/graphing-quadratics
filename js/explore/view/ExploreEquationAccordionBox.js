// Copyright 2018-2020, University of Colorado Boulder

/**
 * Equation accordion box in the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQEquationAccordionBox from '../../common/view/GQEquationAccordionBox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import StandardFormEquationNode from '../../standardform/view/StandardFormEquationNode.js';
import ExploreInteractiveEquationNode from './ExploreInteractiveEquationNode.js';

class ExploreEquationAccordionBox extends GQEquationAccordionBox {

  /**
   * @param {ExploreModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    assert && assert( !options.titleNode, 'ExploreEquationAccordionBox sets titleNode' );
    options.titleNode = new StandardFormEquationNode( {
      maxWidth: 225, // determined empirically
      tandem: options.tandem.createTandem( 'titleNode' ),
      phetioDocumentation: 'the equation shown at the top of this accordion box',
      visiblePropertyOptions: { phetioReadOnly: true }
    } );

    const interactiveEquationNode = new ExploreInteractiveEquationNode(
      model.aProperty, model.bProperty, model.cProperty, {
        tandem: options.tandem.createTandem( 'interactiveEquationNode' ),
        phetioDocumentation: 'the interactive equation in this accordion box'
      } );

    super( model, interactiveEquationNode, options );
  }
}

graphingQuadratics.register( 'ExploreEquationAccordionBox', ExploreEquationAccordionBox );
export default ExploreEquationAccordionBox;