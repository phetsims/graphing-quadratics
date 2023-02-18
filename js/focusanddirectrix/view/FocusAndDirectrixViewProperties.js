// Copyright 2018-2020, University of Colorado Boulder

/**
 * View-specific Properties and properties for the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQViewProperties from '../../common/view/GQViewProperties.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export default class FocusAndDirectrixViewProperties extends GQViewProperties {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {

      // {string} form of equations used to label curves on the graph, see GQConstants.EQUATION_FORMS
      equationForm: 'vertex',

      // {boolean} values for optional BooleanProperties
      vertexVisible: true,
      coordinatesVisible: true,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    super( options );

    // @public
    this.focusVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'focusVisibleProperty' ),
      phetioDocumentation: 'whether the focus manipulator is visible'
    } );

    // @public
    this.directrixVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'directrixVisibleProperty' ),
      phetioDocumentation: 'whether the directrix is visible'
    } );

    // @public whether an interactive point is visible on the quadratic
    this.pointOnParabolaVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'pointOnParabolaVisibleProperty' ),
      phetioDocumentation: 'whether the manipulator for the point on the parabola is visible'
    } );
  }

  /**
   * @public
   * @override
   */
  reset() {
    super.reset();
    this.focusVisibleProperty.reset();
    this.directrixVisibleProperty.reset();
    this.pointOnParabolaVisibleProperty.reset();
  }
}

graphingQuadratics.register( 'FocusAndDirectrixViewProperties', FocusAndDirectrixViewProperties );