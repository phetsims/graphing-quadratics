// Copyright 2018-2020, University of Colorado Boulder

/**
 * View-specific Properties and properties that are common to more than one screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';

class GQViewProperties extends PhetioObject {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {

      // {string} form of equations used to label curves on the graph, see GQConstants.EQUATION_FORMS
      equationForm: 'standard',

      // {boolean|null} initial values for optional BooleanProperties
      // A null value means to omit the corresponding BooleanProperty.
      // These options were added to address the duplication of 3 contentious BooleanProperties.
      // See https://github.com/phetsims/graphing-quadratics/issues/55
      vertexVisible: null,
      axisOfSymmetryVisible: null,
      coordinatesVisible: null,

      // phet-io                                                                                                              
      tandem: Tandem.REQUIRED,
      phetioDocumentation: 'Properties that are specific to the view',
      phetioState: false

    }, options );

    assert && assert( _.includes( GQConstants.EQUATION_FORMS, options.equationForm ),
      'invalid equationForm: ' + options.equationForm );

    super( options );

    // @public {string} form of equations used to label curves. It is not necessary to expose this via PhET-iO.
    this.equationForm = options.equationForm;

    // Properties that are common to all screens ---------------------------------------------------------------------

    // @public
    this.graphContentsVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'graphContentsVisibleProperty' ),
      phetioDocumentation: 'whether the contents of the graph (curves, plotted points, manipulators) are visible'
    } );

    // @public
    this.equationAccordionBoxExpandedProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'equationAccordionBoxExpandedProperty' ),
      phetioDocumentation: 'whether the equation accordion box is expanded'
    } );

    // @public
    this.equationsVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'equationsVisibleProperty' ),
      phetioDocumentation: 'whether equations are visible on graphed curves'
    } );

    // Properties that are optional ----------------------------------------------------------------------------------

    if ( options.vertexVisible !== null ) {
      // @public
      this.vertexVisibleProperty = new BooleanProperty( options.vertexVisible, {
        tandem: options.tandem.createTandem( 'vertexVisibleProperty' ),
        phetioDocumentation: 'whether the vertex point or manipulator is visible'
      } );
    }

    if ( options.axisOfSymmetryVisible !== null ) {
      // @public
      this.axisOfSymmetryVisibleProperty = new BooleanProperty( options.axisOfSymmetryVisible, {
        tandem: options.tandem.createTandem( 'axisOfSymmetryVisibleProperty' ),
        phetioDocumentation: 'whether the axis of symmetry is visible'
      } );
    }

    if ( options.coordinatesVisible !== null ) {
      // @public
      this.coordinatesVisibleProperty = new BooleanProperty( options.coordinatesVisible, {
        tandem: options.tandem.createTandem( 'coordinatesVisibleProperty' ),
        phetioDocumentation: 'whether (x,y) coordinates are visible on points that are displayed on the graph'
      } );
    }
  }

  /**
   * @public
   */
  reset() {

    // Properties that are common to all screens
    this.graphContentsVisibleProperty.reset();
    this.equationAccordionBoxExpandedProperty.reset();
    this.equationsVisibleProperty.reset();

    // Properties that are optional
    this.vertexVisibleProperty && this.vertexVisibleProperty.reset();
    this.axisOfSymmetryVisibleProperty && this.axisOfSymmetryVisibleProperty.reset();
    this.coordinatesVisibleProperty && this.coordinatesVisibleProperty.reset();
  }
}

graphingQuadratics.register( 'GQViewProperties', GQViewProperties );
export default GQViewProperties;