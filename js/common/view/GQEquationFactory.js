// Copyright 2018, University of Colorado Boulder

/**
 * GQEquationFactory creates Nodes that display various equations needed by this sim.
 * Equations are reduced so that they don't contain terms that evaluate to zero,
 * and coefficients are displayed as positive decimal numbers.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Util = require( 'DOT/Util' );

  const GQEquationFactory = {

    /**
     * Creates an equation in standard form, y = ax^2 + bx + c
     * @param {Quadratic} quadratic
     * @param {Object} [options]
     * @public
     */
    createStandardForm( quadratic, options ) {

      options = _.extend( {
        font: new PhetFont( GQConstants.GRAPH_EQUATION_FONT_SIZE ),
        aDecimals: GQConstants.EXPLORE_DECIMALS_A,
        bDecimals: GQConstants.EXPLORE_DECIMALS_B,
        cDecimals: GQConstants.EXPLORE_DECIMALS_C
      }, options );

      // use toFixedNumber so we don't have trailing zeros
      const a = Util.toFixedNumber( quadratic.a, options.aDecimals );
      const b = Util.toFixedNumber( quadratic.b, options.bDecimals );
      const c = Util.toFixedNumber( quadratic.c, options.cDecimals );

      // y =
      let equationString = GQSymbols.y + ' ' + MathSymbols.EQUAL_TO + ' ';

      if ( a === 0 && b === 0 && c === 0 ) {

        // y = 0
        equationString += '0';
      }
      else {

        // ax^2 term
        if ( a !== 0 ) {

          if ( a === -1 ) {
            equationString += MathSymbols.UNARY_MINUS; // -x^2
          }
          else if ( a !== 1 ) {
            equationString += a; // ax^2
          }

          equationString += GQSymbols.xSquared;

          if ( b !== 0 || c !== 0 ) {
            equationString += ' ';
          }
        }

        // bx term
        if ( b !== 0 ) {

          if ( a === 0 ) {
            if ( b === -1 ) {
              equationString += MathSymbols.UNARY_MINUS; // -x
            }
            else if ( b !== 1 ) {
              equationString += b; // bx
            }
            equationString += GQSymbols.x;
          }
          else {
            equationString += ( b > 0 ) ? MathSymbols.PLUS : MathSymbols.MINUS;
            equationString += ' ';
            if ( Math.abs( b ) !== 1 ) {
              equationString += Math.abs( b );
            }
            equationString += GQSymbols.x;
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
            equationString += ( c > 0 ) ? MathSymbols.PLUS : MathSymbols.MINUS;
            equationString += ' ' + Math.abs( c );
          }
        }
      }

      const equationNode = new RichText( equationString, {
        fill: quadratic.color,
        font: options.font
      } );

      return withBackground( equationNode );
    },

    /**
     * Creates an equation in vertex form, y = a(x - h)^2 + k
     * @param {Quadratic} quadratic
     * @param {Object} [options]
     * @public
     */
    createVertexForm( quadratic, options ) {

      options = _.extend( {
        font: new PhetFont( GQConstants.GRAPH_EQUATION_FONT_SIZE ),
        aDecimals: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_A,
        hDecimals: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_H,
        kDecimals: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_K
      }, options );

      // use toFixedNumber so we don't have trailing zeros
      const a = Util.toFixedNumber( quadratic.a, options.aDecimals );
      const h = Util.toFixedNumber( quadratic.h, options.hDecimals );
      const k = Util.toFixedNumber( quadratic.k, options.kDecimals );

      // y =
      let equationString = GQSymbols.y + ' ' + MathSymbols.EQUAL_TO + ' ';

      if ( a === 0 && k === 0 ) {

        // y = 0
        equationString += '0';
      }
      else if ( a === 0 ) {

        // y = c
        equationString += Util.toFixedNumber( quadratic.c, options.kDecimals );
      }
      else {

        // a(x - h)^2 term
        if ( a === -1 ) {
          equationString += MathSymbols.UNARY_MINUS;
        }
        else if ( a !== 1 ) {
          equationString += a;
        }

        if ( h === 0 ) {
          equationString += GQSymbols.xSquared;
        }
        else {
          equationString += '(' + GQSymbols.x + ' ';
          equationString += ( h > 0 ) ? MathSymbols.MINUS : MathSymbols.PLUS;
          equationString += ' ' + Math.abs( h );
          equationString += ')<sup>2</sup>';
        }

        if ( k !== 0 ) {
          equationString += ' ';
        }

        // k term
        if ( k !== 0 ) {
          if ( a === 0 ) {
            equationString += k;
          }
          else {
            equationString += ( k > 0 ) ? MathSymbols.PLUS : MathSymbols.MINUS;
            equationString += ' ' + Math.abs( k );
          }
        }
      }

      const equationNode = new RichText( equationString, {
        fill: quadratic.color,
        font: options.font
      } );

      return withBackground( equationNode );
    },

    /**
     * Creates the directrix equation.
     * @param {number} directrix
     * @public
     */
    createDirectrix( directrix ) {

      // y = N
      const equationString = GQSymbols.y + ' ' + MathSymbols.EQUAL_TO + ' ' +
                             Util.toFixedNumber( directrix, GQConstants.DIRECTRIX_DECIMALS );

      const equationNode = new RichText( equationString, {
        font: new PhetFont( GQConstants.GRAPH_EQUATION_FONT_SIZE ),
        fill: GQColors.DIRECTRIX
      } );

      return withBackground( equationNode );
    }
    ,

    /**
     * Creates the axis of symmetry equation.
     * @param {number} axisOfSymmetry
     * @public
     */
    createAxisOfSymmetry( axisOfSymmetry ) {

      // x = N
      const equationString = GQSymbols.x + ' ' + MathSymbols.EQUAL_TO + ' ' +
                             Util.toFixedNumber( axisOfSymmetry, GQConstants.AXIS_OF_SYMMETRY_DECIMALS );

      const equationNode = new RichText( equationString, {
        font: new PhetFont( GQConstants.GRAPH_EQUATION_FONT_SIZE ),
        fill: GQColors.AXIS_OF_SYMMETRY,
        rotation: Math.PI / 2
      } );

      return withBackground( equationNode );
    }
  };

  /**
   * Common method to put an equation on a translucent background.
   * @param {Node} node
   * @returns {Node}
   */
  function withBackground( node ) {

    // translucent background, sized to fit
    const backgroundNode = new Rectangle( 0, 0, node.width + 4, node.height + 2, {
      fill: 'white',
      opacity: 0.75,
      center: node.center
    } );

    return new Node( { children: [ backgroundNode, node ] } );
  }

  return graphingQuadratics.register( 'GQEquationFactory', GQEquationFactory );
} )
;