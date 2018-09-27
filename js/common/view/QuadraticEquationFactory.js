// Copyright 2018, University of Colorado Boulder

/**
 * QuadraticQuadraticEquationFactory creates Nodes that display a quadratic equation in various forms.
 * Equations are reduced so that they don't contain terms that evaluate to zero,
 * and coefficients are displayed as positive decimal numbers.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQSymbols = require( 'GRAPHING_QUADRATICS/common/GQSymbols' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  const QuadraticEquationFactory = {

    /**
     * Creates an equation in standard form, y = ax^2 + bx + c
     * @param {Quadratic} quadratic
     * @param {Object} [options]
     * @public
     */
    createStandardForm: function( quadratic, options ) {

      options = _.extend( {
        font: new PhetFont( GQConstants.GRAPH_EQUATION_FONT_SIZE ),
        aDecimals: GQConstants.EXPLORE_DECIMALS_A,
        bDecimals: GQConstants.EXPLORE_DECIMALS_B,
        cDecimals: GQConstants.EXPLORE_DECIMALS_C,

        // HBox options
        spacing: 5,
        align: 'bottom'
      }, options );

      const a = Util.toFixedNumber( quadratic.a, options.aDecimals );
      const b = Util.toFixedNumber( quadratic.b, options.bDecimals );
      const c = Util.toFixedNumber( quadratic.c, options.cDecimals );

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
            a: a,
            x: GQSymbols.x
          } );
        }
        children.push( new RichText( aTermString, textOptions ) );
      }

      // bx term
      if ( b !== 0 ) {

        let bTermString = null;

        if ( a === 0 ) {
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
            // bx
            bTermString = StringUtils.fillIn( '{{b}}{{x}}', {
              b: b,
              x: GQSymbols.x
            } );
          }
        }
        else {

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
              b: Math.abs( b ),
              x: GQSymbols.x
            } );
          }
        }
        children.push( new RichText( bTermString, textOptions ) );
      }

      // c term
      if ( c !== 0 ) {

        if ( a === 0 && b === 0 ) {
          // c
          children.push( new RichText( c, textOptions ) );
        }
        else {

          // plus or minus operator
          if ( c > 0 ) {
            children.push( new RichText( MathSymbols.PLUS, textOptions ) );
          }
          else if ( c < 0 ) {
            children.push( new RichText( MathSymbols.MINUS, textOptions ) );
          }

          // |c|
          children.push( new RichText( Math.abs( c ), textOptions ) );
        }
      }

      // y = 0
      if ( a === 0 && b === 0 && c === 0 ) {
        children.push( new RichText( 0, textOptions ) );
      }

      assert && assert( !options.children, 'QuadraticEquationFactory sets children' );
      options.children = children;

      return new HBox( options );
    },

    /**
     * Creates an equation in vertex form, y = a(x - h)^2 + k
     * @param {Quadratic} quadratic
     * @param {Object} [options]
     * @public
     */
    createVertexForm: function( quadratic, options ) {

      options = _.extend( {
        font: new PhetFont( GQConstants.GRAPH_EQUATION_FONT_SIZE ),
        aDecimals: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_A,
        hDecimals: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_H,
        kDecimals: GQConstants.FOCUS_AND_DIRECTRIX_DECIMALS_K,

        // HBox options
        spacing: 5,
        align: 'bottom'
      }, options );

      const a = Util.toFixedNumber( quadratic.a, options.aDecimals );
      const h = Util.toFixedNumber( quadratic.h, options.hDecimals );
      const k = Util.toFixedNumber( quadratic.k, options.kDecimals );

      const children = [];

      const textOptions = {
        fill: quadratic.color,
        font: options.font
      };

      if ( a === 0 ) {

        // y = k
        const yEqualsString = StringUtils.fillIn( '{{y}} {{equals}} {{k}}', {
          y: GQSymbols.y,
          equals: MathSymbols.EQUAL_TO,
          k: k
        } );
        children.push( new RichText( yEqualsString, textOptions ) );
      }
      else {

        // y =
        const yEqualsString = StringUtils.fillIn( '{{y}} {{equals}}', {
          y: GQSymbols.y,
          equals: MathSymbols.EQUAL_TO
        } );
        children.push( new RichText( yEqualsString, textOptions ) );

        // a(x
        let axString = null;
        if ( a === 1 ) {
          axString = StringUtils.fillIn( '({{x}}', {
            x: GQSymbols.x
          } );
        }
        else if ( a === -1 ) {
          axString = StringUtils.fillIn( '{{minus}}({{x}}', {
            minus: MathSymbols.UNARY_MINUS,
            x: GQSymbols.x
          } );
        }
        else {
          axString = StringUtils.fillIn( '{{a}}({{x}}', {
            a: a,
            x: GQSymbols.x
          } );
        }

        if ( h === 0 ) {
          axString += ')<sup>2</sup>';
        }
        children.push( new RichText( axString, textOptions ) );

        // h
        if ( h !== 0 ) {
          const hString = StringUtils.fillIn( '{{operator}} {{h}})<sup>2</sup>', {
            operator: ( h > 0 ) ? MathSymbols.MINUS : MathSymbols.PLUS,
            h: Math.abs( h )
          } );
          children.push( new RichText( hString, textOptions ) );
        }

        // k
        if ( k !== 0 ) {
          const kString = StringUtils.fillIn( '{{operator}} {{k}}', {
            operator: ( k > 0 ) ? MathSymbols.PLUS : MathSymbols.MINUS,
            k: Math.abs( k )
          } );
          children.push( new RichText( kString, textOptions ) );
        }
      }

      assert && assert( !options.children, 'QuadraticEquationFactory sets children' );
      options.children = children;

      return new HBox( options );
    }
  };

  return graphingQuadratics.register( 'QuadraticEquationFactory', QuadraticEquationFactory );
} );