// Copyright 2018-2022, University of Colorado Boulder

/**
 * Model for the 'Explore' screen.  Extends the 'Standard Form' model by adding curves for
 * the individual terms of the interactive quadratic.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Quadratic from '../../common/model/Quadratic.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import StandardFormModel from '../../standardform/model/StandardFormModel.js';

export default class ExploreModel extends StandardFormModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    super( tandem, {

      // NumberProperty coefficients values in this screen are continuous, controlled by sliders
      numberType: 'FloatingPoint'
    } );

    // @public {DerivedProperty.<Quadratic>}
    this.quadraticTermProperty = new DerivedProperty( [ this.quadraticProperty ],
      quadratic => quadratic.getQuadraticTerm(), {
        tandem: tandem.createTandem( 'quadraticTermProperty' ),
        phetioDocumentation: 'the quadratic term (y = ax^2) of the interactive quadratic',
        phetioValueType: Quadratic.QuadraticIO
      } );

    // @public {DerivedProperty.<Quadratic>}
    this.linearTermProperty = new DerivedProperty( [ this.quadraticProperty ],
      quadratic => quadratic.getLinearTerm(), {
        tandem: tandem.createTandem( 'linearTermProperty' ),
        phetioDocumentation: 'the linear term (y = bx) of the interactive quadratic',
        phetioValueType: Quadratic.QuadraticIO
      } );

    // @public {DerivedProperty.<Quadratic>}
    this.constantTermProperty = new DerivedProperty( [ this.quadraticProperty ],
      quadratic => quadratic.getConstantTerm(), {
        tandem: tandem.createTandem( 'constantTermProperty' ),
        phetioDocumentation: 'the constant term (y = c) of the interactive quadratic',
        phetioValueType: Quadratic.QuadraticIO
      } );
  }
}

graphingQuadratics.register( 'ExploreModel', ExploreModel );