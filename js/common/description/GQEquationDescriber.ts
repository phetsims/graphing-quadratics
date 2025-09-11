// Copyright 2018-2025, University of Colorado Boulder

/**
 * GQEquationDescriber is a collection of methods for creating natural language descriptions of quadratic equations.
 *
 * When core description was added to Graphing Quadratics in 2025, PhET had no support for converting mathematical
 * expressions into spoken language. The sim team decided that a reasonable path forward was to evaluate existing tools
 * to see how they addressed accessibility of mathematical expressions.  MathJax looked promising, and it supports
 * various "speech rule engines", the default being ClearSpeak.  We could not use MathJax or ClearSpeak directly in
 * the sim because MaxJax lacks support for localization. So we decided to generate our own natural language
 * descriptions that emulate ClearSpeak. See https://github.com/phetsims/graphing-quadratics/issues/226 for history.
 *
 * Note that we are using string concatenation to assemble these descriptions. Concatenation is typically verboten in
 * the general case, because it results in a string whose order is fixed and cannot be localized. But math expressions
 * seem to be an exception, as equations and expressions are written in the same left-to-right order regardless of
 * locale. So it's acceptable to use concatenation here -- and practically speaking, we had no other choice.
 *
 * This class was created by copying GQEquationFactory, then adjusting the implementation to produce natural language
 * instead of RichText markup.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import graphingQuadratics from '../../graphingQuadratics.js';
import GQConstants from '../GQConstants.js';
import Quadratic from '../model/Quadratic.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';

export default class GQEquationDescriber {

  /**
   * Creates the description for a standard-form equation, y = ax^2 + bx + c.
   * Terms that evaluate to 0 are omitted from the description.
   * b and c are described as their absolute values, and the preceding operator is plus or minus accordingly.
   * a and b require special handling when their value is 1 or -1.
   */
  public static createStandardFormDescription( quadratic: Quadratic,
                                               yString: string,
                                               xString: string,
                                               squaredString: string,
                                               equalsString: string,
                                               plusString: string,
                                               minusString: string,
                                               negativeString: string ): string {

    // use toFixedNumber so we don't have trailing zeros
    const a = toFixedNumber( quadratic.a, GQConstants.EXPLORE_DECIMALS_A );
    const b = toFixedNumber( quadratic.b, GQConstants.EXPLORE_DECIMALS_B );
    const c = toFixedNumber( quadratic.c, GQConstants.EXPLORE_DECIMALS_C );

    // y =
    let equationString = `${yString} ${equalsString} `;

    if ( a === 0 && b === 0 && c === 0 ) {

      // y = 0
      equationString += '0';
    }
    else {

      // ax^2 term
      if ( a !== 0 ) {

        if ( a === -1 ) {
          equationString += `${negativeString} `; // -x^2
        }
        else if ( a !== 1 ) {
          equationString += `${a} `; // ax^2
        }

        equationString += `${xString} ${squaredString}`;

        if ( b !== 0 || c !== 0 ) {
          equationString += ' ';
        }
      }

      // bx term
      if ( b !== 0 ) {

        if ( a === 0 ) {
          if ( b === -1 ) {
            equationString += `${negativeString} `; // -x
          }
          else if ( b !== 1 ) {
            equationString += `${b} `; // bx
          }
          equationString += xString;
        }
        else {
          equationString += ( b > 0 ) ? plusString : minusString;
          equationString += ' ';
          if ( Math.abs( b ) !== 1 ) {
            equationString += `${Math.abs( b )} `;
          }
          equationString += xString;
        }

        if ( c !== 0 ) {
          equationString += ' ';
        }
      }

      // c term
      if ( c !== 0 ) {
        if ( a === 0 && b === 0 ) {
          equationString += c;
        }
        else {
          equationString += ( c > 0 ) ? plusString : minusString;
          equationString += ` ${Math.abs( c )}`;
        }
      }
    }

    return equationString;
  }

  /**
   * Creates the description for a vertex-form equation, y = a(x - h)^2 + k.
   * Terms that evaluate to 0 are omitted from the description.
   * h and k are described as their absolute values, and the preceding operator is plus or minus accordingly.
   * a requires special handling when its value is 1 or -1.
   */
  public static createVertexFormDescription( quadratic: Quadratic,
                                             yString: string,
                                             xString: string,
                                             squaredString: string,
                                             equalsString: string,
                                             plusString: string,
                                             minusString: string,
                                             timesString: string,
                                             openParenString: string,
                                             closeParenString: string ): string {

    // use toFixedNumber so we don't have trailing zeros
    const a = toFixedNumber( quadratic.a, GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_A );
    const h = ( quadratic.h === undefined ) ? 0 : toFixedNumber( quadratic.h, GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_H );
    const k = ( quadratic.k === undefined ) ? quadratic.c : toFixedNumber( quadratic.k, GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_K );

    // y equals
    let equationString = `${yString} ${equalsString} `;

    if ( a === 0 && k === 0 ) {

      // y equals 0
      equationString += '0';
    }
    else if ( a === 0 ) {

      // y equals {{k}}
      equationString += toFixedNumber( k, GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_K );
    }
    else {
      if ( h === 0 ) {

        // {{a}} x squared
        if ( a !== 1 ) {
          equationString += `${a}`;
        }
        equationString += ` ${xString} ${squaredString}`;
      }
      else {

        // {{a}} times the quantity (x plus|minus {{h}}) squared
        if ( a !== 1 ) {
          equationString += `${a} ${timesString} `;
        }
        equationString += `${openParenString} ${xString} `;
        equationString += ( h > 0 ) ? minusString : plusString;
        equationString += ` ${Math.abs( h )} ${closeParenString} ${squaredString}`;
      }

      // k term
      if ( k !== 0 ) {
        equationString += ' ';
        if ( a === 0 ) {
          equationString += k;
        }
        else {
          equationString += ( k > 0 ) ? plusString : minusString;
          equationString += ` ${Math.abs( k )}`;
        }
      }
    }

    return equationString;
  }

  /**
   * Creates the description for the directrix equation, y = {{directrix}}.
   */
  public static createDirectrixDescription( directrix: number, yString: string, equalsString: string ): string {
    return `${yString} ${equalsString} ${toFixedNumber( directrix, GQConstants.DIRECTRIX_DECIMALS )}`;
  }

  /**
   * Creates the description for the axis of symmetry equation, x = {{axisOfSymmetry}}.
   */
  public static createAxisOfSymmetryDescription( axisOfSymmetry: number, xString: string, equalsString: string ): string {
    return `${xString} ${equalsString} ${toFixedNumber( axisOfSymmetry, GQConstants.AXIS_OF_SYMMETRY_DECIMALS )}`;
  }
}

graphingQuadratics.register( 'GQEquationDescriber', GQEquationDescriber );