// Copyright 2018-2025, University of Colorado Boulder

/**
 * FocusAndDirectrixViewProperties is the set of view-specific Properties for the 'Focus & Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQViewProperties from '../../common/view/GQViewProperties.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export default class FocusAndDirectrixViewProperties extends GQViewProperties {

  public readonly vertexVisibleProperty: Property<boolean>;
  public readonly focusVisibleProperty: Property<boolean>;
  public readonly directrixVisibleProperty: Property<boolean>;
  public readonly pointOnParabolaVisibleProperty: Property<boolean>;
  public readonly coordinatesVisibleProperty: Property<boolean>;

  public constructor( tandem: Tandem ) {

    super( {
      equationForm: 'vertex',
      tandem: tandem
    } );

    this.vertexVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'vertexVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'whether the vertex point or manipulator is visible'
    } );

    this.focusVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'focusVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'whether the focus manipulator is visible'
    } );

    this.directrixVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'directrixVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'whether the directrix is visible'
    } );

    this.pointOnParabolaVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'pointOnParabolaVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'whether the manipulator for the point on the parabola is visible'
    } );

    this.coordinatesVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'coordinatesVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'whether (x,y) coordinates are visible on points that are displayed on the graph'
    } );
  }

  public override reset(): void {
    this.vertexVisibleProperty.reset();
    this.focusVisibleProperty.reset();
    this.directrixVisibleProperty.reset();
    this.pointOnParabolaVisibleProperty.reset();
    this.coordinatesVisibleProperty.reset();
    super.reset();
  }
}

graphingQuadratics.register( 'FocusAndDirectrixViewProperties', FocusAndDirectrixViewProperties );