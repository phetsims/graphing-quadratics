// Copyright 2018-2025, University of Colorado Boulder

/**
 * Standard form equation, y = ax^2 + bx + c, with coefficients that can be changed via sliders.
 * The slider for coefficient 'a' has a quadratic taper (since it's modifying a quadratic term), while
 * the other sliders are linear.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import NumberDisplay, { NumberDisplayOptions } from '../../../../scenery-phet/js/NumberDisplay.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import RichText, { RichTextOptions } from '../../../../scenery/js/nodes/RichText.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQSymbols from '../../common/GQSymbols.js';
import LinearSlider from '../../common/view/LinearSlider.js';
import QuadraticSlider from '../../common/view/QuadraticSlider.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';

type SelfOptions = EmptySelfOptions;

type ExploreInteractiveEquationNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem' | 'phetioDocumentation'>;

export default class ExploreInteractiveEquationNode extends Node {

  /**
   * Constructor parameters are coefficients of the standard form: y = ax^2 + bx + c
   */
  public constructor( aProperty: NumberProperty,
                      bProperty: NumberProperty,
                      cProperty: NumberProperty,
                      providedOptions: ExploreInteractiveEquationNodeOptions ) {

    const options = optionize<ExploreInteractiveEquationNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      isDisposable: false,
      excludeInvisibleChildrenFromBounds: true,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions );

    const equationOptions: RichTextOptions = {
      font: GQConstants.INTERACTIVE_EQUATION_FONT
    };
    const xyOptions = combineOptions<RichTextOptions>( {}, equationOptions, {
      maxWidth: 20 // determined empirically
    } );

    // y =
    const yText = new RichText( GQSymbols.yMarkupStringProperty, xyOptions );
    const equalToText = new RichText( MathSymbols.EQUAL_TO, equationOptions );

    // a
    const aNumberDisplay = new NumberDisplay( aProperty, aProperty.range,
      combineOptions<NumberDisplayOptions>( {}, GQConstants.NUMBER_DISPLAY_OPTIONS, {
        textOptions: {
          fill: GQColors.exploreAColorProperty
        },
        decimalPlaces: GQConstants.EXPLORE_DECIMALS_A
      } ) );

    // x^2 +
    const xSquaredText = new RichText( GQSymbols.xSquaredMarkupStringProperty, xyOptions );
    const plusText = new RichText( MathSymbols.PLUS, equationOptions );

    // b
    const bNumberDisplay = new NumberDisplay( bProperty, bProperty.range,
      combineOptions<NumberDisplayOptions>( {}, GQConstants.NUMBER_DISPLAY_OPTIONS, {
        textOptions: {
          fill: GQColors.exploreBColorProperty
        },
        decimalPlaces: GQConstants.EXPLORE_DECIMALS_B
      } ) );

    // x +
    const xText = new RichText( GQSymbols.xMarkupStringProperty, xyOptions );
    const plusText2 = new RichText( MathSymbols.PLUS, equationOptions );

    // c
    const cNumberDisplay = new NumberDisplay( cProperty, bProperty.range,
      combineOptions<NumberDisplayOptions>( {}, GQConstants.NUMBER_DISPLAY_OPTIONS, {
        textOptions: {
          fill: GQColors.exploreCColorProperty
        },
        decimalPlaces: GQConstants.EXPLORE_DECIMALS_C
      } ) );

    // All parts of equation in one Node, for PhET-iO
    const equationNode = new Node( {
      children: [ yText, equalToText, aNumberDisplay, xSquaredText, plusText, xText, bNumberDisplay, plusText2, cNumberDisplay ],
      tandem: options.tandem.createTandem( 'equationNode' ),
      phetioDocumentation: 'the equation that changes as the sliders are adjusted',
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    // a, b, c sliders
    const aSlider = new QuadraticSlider( GQSymbols.aMarkupStringProperty, aProperty, {
      interval: GQConstants.EXPLORE_INTERVAL_A,
      snapToZeroEpsilon: GQConstants.EXPLORE_SNAP_TO_ZERO_EPSILON_A,
      labelColor: GQColors.exploreAColorProperty,
      sliderOptions: {
        accessibleName: GraphingQuadraticsStrings.a11y.aSlider.accessibleNameStringProperty,
        accessibleHelpText: GraphingQuadraticsStrings.a11y.aSlider.accessibleHelpTextStringProperty,
        tandem: options.tandem.createTandem( 'aSlider' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.SLIDER_DOC, { symbol: 'a' } )
      }
    } );

    const bSlider = new LinearSlider( GQSymbols.bMarkupStringProperty, bProperty, {
      interval: GQConstants.EXPLORE_INTERVAL_B,
      labelColor: GQColors.exploreBColorProperty,
      sliderOptions: {
        accessibleName: GraphingQuadraticsStrings.a11y.bSlider.accessibleNameStringProperty,
        accessibleHelpText: GraphingQuadraticsStrings.a11y.bSlider.accessibleHelpTextStringProperty,
        tandem: options.tandem.createTandem( 'bSlider' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.SLIDER_DOC, { symbol: 'b' } )
      }
    } );

    const cSlider = new LinearSlider( GQSymbols.cMarkupStringProperty, cProperty, {
      interval: GQConstants.EXPLORE_INTERVAL_C,
      labelColor: GQColors.exploreCColorProperty,
      sliderOptions: {
        accessibleName: GraphingQuadraticsStrings.a11y.cSlider.accessibleNameStringProperty,
        accessibleHelpText: GraphingQuadraticsStrings.a11y.cSlider.accessibleHelpTextStringProperty,
        tandem: options.tandem.createTandem( 'cSlider' ),
        phetioDocumentation: StringUtils.fillIn( GQConstants.SLIDER_DOC, { symbol: 'c' } )
      }
    } );

    options.children = [ equationNode, aSlider, bSlider, cSlider ];

    super( options );

    // If any of the components that include dynamic text change their size, redo the layout.
    Multilink.multilink( [
        yText.boundsProperty, xSquaredText.boundsProperty, xText.boundsProperty,
        aSlider.boundsProperty, bSlider.boundsProperty, cSlider.boundsProperty
      ],
      () => {

        // equation layout: y = ax^2 + bx + c
        equalToText.left = yText.right + GQConstants.EQUATION_OPERATOR_SPACING;
        aNumberDisplay.left = equalToText.right + GQConstants.EQUATION_OPERATOR_SPACING;
        xSquaredText.left = aNumberDisplay.right + GQConstants.EQUATION_TERM_SPACING;
        plusText.left = xSquaredText.right + GQConstants.EQUATION_OPERATOR_SPACING;
        bNumberDisplay.left = plusText.right + GQConstants.EQUATION_OPERATOR_SPACING;
        xText.left = bNumberDisplay.right + GQConstants.EQUATION_TERM_SPACING;
        plusText2.left = xText.right + GQConstants.EQUATION_OPERATOR_SPACING;
        cNumberDisplay.left = plusText2.right + GQConstants.EQUATION_OPERATOR_SPACING;
        aNumberDisplay.bottom = equalToText.bottom;
        bNumberDisplay.bottom = equalToText.bottom;
        cNumberDisplay.bottom = equalToText.bottom;

        // horizontally align sliders under their associated values in the equation
        const ySpacing = 3;
        aSlider.x = aNumberDisplay.centerX;
        aSlider.top = equationNode.bottom + ySpacing;
        bSlider.x = bNumberDisplay.centerX;
        bSlider.top = equationNode.bottom + ySpacing;
        cSlider.x = cNumberDisplay.centerX;
        cSlider.top = equationNode.bottom + ySpacing;
      } );
  }
}

graphingQuadratics.register( 'ExploreInteractiveEquationNode', ExploreInteractiveEquationNode );