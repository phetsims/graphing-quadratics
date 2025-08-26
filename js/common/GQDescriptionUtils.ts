// Copyright 2025, University of Colorado Boulder

/**
 * GQDescriptionUtils is a collection of utility functions related to description strings in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingQuadratics from '../graphingQuadratics.js';
import Quadratic from './model/Quadratic.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import GQConstants from './GQConstants.js';
import { toFixedNumber } from '../../../dot/js/util/toFixedNumber.js';

export default class GQDescriptionUtils {

  private constructor() {
    // Not intended for instantiation.
  }

  /**
   * Gets the description of a quadratic in standard form.
   */
  public static getStandardFormDescription( quadratic: Quadratic ): string {
    return StringUtils.fillIn( 'y equals {{a}} x squared plus {{b}} x plus {{c}}', {
      a: toFixedNumber( quadratic.a, GQConstants.EXPLORE_DECIMALS_A ),
      b: toFixedNumber( quadratic.b, GQConstants.EXPLORE_DECIMALS_B ),
      c: toFixedNumber( quadratic.c, GQConstants.EXPLORE_DECIMALS_C )
    } );
  }

  /**
   * Gets the description of a quadratic in vertex form.
   */
  public static getVertexFormDescription( quadratic: Quadratic ): string {
    assert && assert( quadratic.h !== undefined );
    assert && assert( quadratic.k !== undefined );
    return StringUtils.fillIn( 'y equals {{a}} times (x minus {{h}}), squared, plus {{k}}', {
      a: toFixedNumber( quadratic.a, GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_A ),
      h: toFixedNumber( quadratic.h!, GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_H ),
      k: toFixedNumber( quadratic.k!, GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_K )
    } );
  }

  /**
   * Gets the description of a quadratic in the form used in the 'Focus & Directrix' screen.
   */
  public static getFocusAndDirectrixFormDescription( quadratic: Quadratic ): string {
    assert && assert( quadratic.p !== undefined );
    assert && assert( quadratic.h !== undefined );
    assert && assert( quadratic.k !== undefined );
    return StringUtils.fillIn( 'y equals 1 over 4 {{p}}, times (x minus {{h}}) squared, plus {{k}}', {
      p: toFixedNumber( quadratic.p!, GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_P ),
      h: toFixedNumber( quadratic.h!, GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_H ),
      k: toFixedNumber( quadratic.k!, GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_K )
    } );
  }

  /**
   * Gets the description of a quadratic's quadratic term.
   */
  public static getQuadraticTermDescription( quadratic: Quadratic ): string {
    return StringUtils.fillIn( 'y equals {{a}} x squared', {
      a: toFixedNumber( quadratic.a, GQConstants.EXPLORE_DECIMALS_A )
    } );
  }

  /**
   * Gets the description of a quadratic's linear term.
   */
  public static getLinearTermDescription( quadratic: Quadratic ): string {
    return StringUtils.fillIn( 'y equals {{b}} x', {
      b: toFixedNumber( quadratic.b, GQConstants.EXPLORE_DECIMALS_B )
    } );
  }

  /**
   * Gets the description of a quadratic's constant term.
   */
  public static getConstantTermDescription( quadratic: Quadratic ): string {
    return StringUtils.fillIn( 'y equals {{c}}', {
      c: toFixedNumber( quadratic.c, GQConstants.EXPLORE_DECIMALS_C )
    } );
  }

  /**
   * Gets the description of a quadratic's axis of symmetry.
   */
  public static getAxisOfSymmetryDescription( quadratic: Quadratic ): string {
    assert && assert( quadratic.axisOfSymmetry !== undefined );
    return StringUtils.fillIn( 'x equals {{x}}', {
      x: toFixedNumber( quadratic.axisOfSymmetry!, GQConstants.AXIS_OF_SYMMETRY_DECIMALS )
    } );
  }

  /**
   * Gets the description of a quadratic's directrix.
   */
  public static getDirectrixDescription( quadratic: Quadratic ): string {
    assert && assert( quadratic.directrix !== undefined );
    return StringUtils.fillIn( 'y equals {{y}}', {
      y: toFixedNumber( quadratic.directrix!, GQConstants.DIRECTRIX_DECIMALS )
    } );
  }
}
graphingQuadratics.register( 'GQDescriptionUtils', GQDescriptionUtils );