// Copyright 2018, University of Colorado Boulder

/**
 * EquationFactory creates Nodes that display a quadratic equation in various forms.
 * Equations are reduced so that they don't contain terms that evaluate to zero,
 * and coefficients are displayed as positive decimal numbers.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  const EquationFactory = {

    /**
     * Creates an equation in standard form, y = ax^2 + bx + c
     * @param {Quadratic} quadratic
     * @param {Object} [options]
     * @public
     * @static
     */
    createStandardForm: function( quadratic, options ) {

      options = _.extend( {
        font: new PhetFont( 16 ), //TODO factor out font size
        aDecimals: 2,
        bDecimals: 1,
        cDecimals: 1,

        // HBox options
        spacing: 5
      }, options );
      
      const a = quadratic.a;
      const b = quadratic.b;
      const c = quadratic.c;

      const children = [];

      const textOptions = {
        fill: quadratic.color,
        font: options.font
      };

      // y =
      const yEqualsString = StringUtils.fillIn( '{{y}} {{equals}}', {
        y: GQSymbols.y,
        equals: MathSymbols.EQUAL_TO
      } );
      children.push( new RichText( yEqualsString, textOptions ) );

      // ax^2 term
      if ( a !== 0 ) {

        let aTermString = null;
        if ( a === 1 ) {
          // x^2
          aTermString = StringUtils.fillIn( '{{x}}<sup>2</sup>', {
            x: GQSymbols.x
          } );
        }
        else if ( a === -1 ) {
          // -x^2
          aTermString = StringUtils.fillIn( '{{minus}}{{x}}<sup>2</sup>', {
            minus: MathSymbols.UNARY_MINUS,
            x: GQSymbols.x
          } );
        }
        else {
          // ax^2
          aTermString = StringUtils.fillIn( '{{a}}{{x}}<sup>2</sup>', {
            a: Util.toFixedNumber( a, options.aDecimals ),
            x: GQSymbols.x
          } );
        }
        children.push( new RichText( aTermString, textOptions ) );
      }

      // bx term
      if ( b !== 0 ) {

        let bTermString = null;
        if ( a !== 0 ) {

          // plus or minus operator
          if ( b > 0 ) {
            children.push( new RichText( MathSymbols.PLUS, textOptions ) );
          }
          else if ( b < 0 ) {
            children.push( new RichText( MathSymbols.MINUS, textOptions ) );
          }

          if ( Math.abs( b ) === 1 ) {
            // x
            bTermString = GQSymbols.x;
          }
          else {
            // |b|x
            bTermString = StringUtils.fillIn( '{{b}}{{x}}', {
              b: Math.abs( Util.toFixedNumber( b, options.bDecimals ) ),
              x: GQSymbols.x
            } );
          }
        }
        else {

          if ( b === 1 ) {
            // x
            bTermString = GQSymbols.x;
          }
          else if ( b === -1 ) {
            // -x
            bTermString = StringUtils.fillIn( '{{minus}}{{x}}', {
              minus: MathSymbols.UNARY_MINUS,
              x: GQSymbols.x
            } );
          }
          else {
            // x
            bTermString = StringUtils.fillIn( '{{b}}{{x}}', {
              b: Util.toFixedNumber( b, options.bDecimals ),
              x: GQSymbols.x
            } );
          }
        }
        children.push( new RichText( bTermString, textOptions ) );
      }

      // c term
      if ( c !== 0 ) {

        if ( a !== 0 || b !== 0 ) {

          // plus or minus operator
          if ( c > 0 ) {
            children.push( new RichText( MathSymbols.PLUS, textOptions ) );
          }
          else if ( c < 0 ) {
            children.push( new RichText( MathSymbols.MINUS, textOptions ) );
          }

          // |c|
          children.push( new RichText( Math.abs( Util.toFixedNumber( c, options.cDecimals ) ), textOptions ) );
        }
        else {
          // c
          children.push( new RichText( Util.toFixedNumber( c, options.cDecimals ), textOptions ) );
        }
      }

      // y = 0
      if ( a === 0 && b === 0 && c === 0 ) {
        children.push( new RichText( 0, textOptions ) );
      }

      assert && assert( !options.children, 'EquationFactory sets children' );
      options.children = children;

      return new HBox( options );
    }
  };

  return graphingQuadratics.register( 'EquationFactory', EquationFactory );
} );