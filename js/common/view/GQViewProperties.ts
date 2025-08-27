// Copyright 2018-2025, University of Colorado Boulder

/**
 * View-specific Properties and properties that are common to more than one screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export type EquationForm = 'standard' | 'vertex';

type SelfOptions = {

  // form of equations used to label curves on the graph
  equationForm?: EquationForm;
};

type GQViewPropertiesOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class GQViewProperties extends PhetioObject {

  // Form of equations used to label curves. It is not necessary to expose this via PhET-iO.
  public readonly equationForm: EquationForm;

  // Properties that are used by all screens
  public readonly graphContentsVisibleProperty: Property<boolean>;
  public readonly equationAccordionBoxExpandedProperty: Property<boolean>;
  public readonly equationsVisibleProperty: Property<boolean>;

  public constructor( providedOptions: GQViewPropertiesOptions ) {

    const options = optionize<GQViewPropertiesOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      equationForm: 'standard',

      // PhetioObjectOptions
      isDisposable: false,
      phetioDocumentation: 'Properties that are specific to the view',
      phetioState: false
    }, providedOptions );

    super( options );

    this.equationForm = options.equationForm;

    this.graphContentsVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'graphContentsVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'whether the contents of the graph (curves, plotted points, manipulators) are visible'
    } );

    this.equationAccordionBoxExpandedProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'equationAccordionBoxExpandedProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'whether the equation accordion box is expanded'
    } );

    this.equationsVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'equationsVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'whether equations are visible on graphed curves'
    } );
  }

  public reset(): void {
    this.graphContentsVisibleProperty.reset();
    this.equationAccordionBoxExpandedProperty.reset();
    this.equationsVisibleProperty.reset();
  }
}

graphingQuadratics.register( 'GQViewProperties', GQViewProperties );