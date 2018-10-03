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
  const HBox = require( 'SCENERY/nodes/HBox' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
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

      return layoutOnBackground( children );
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

        // a(x - h)^2
        let axhString = null;
        if ( h === 0 ) {
          if ( a === 1 ) {
            // x^2
            axhString = StringUtils.fillIn( '{{x}}<sup>2</sup>', {
              x: GQSymbols.x
            } );
          }
          else if ( a === -1 ) {
            // -x^2
            axhString = StringUtils.fillIn( '{{minus}}{{x}}<sup>2</sup>', {
              minus: MathSymbols.UNARY_MINUS,
              x: GQSymbols.x
            } );
          }
          else {
            // ax^2
            axhString = StringUtils.fillIn( '{{a}}{{x}}<sup>2</sup>', {
              a: a,
              x: GQSymbols.x
            } );
          }
        }
        else {
          const operator = ( h > 0 ) ? MathSymbols.MINUS : MathSymbols.PLUS;
          if ( a === 1 ) {
            // (x - h)^2
            axhString = StringUtils.fillIn( '({{x}} {{operator}} {{h}})<sup>2</sup>', {
              x: GQSymbols.x,
              operator: operator,
              h: Math.abs( h )
            } );
          }
          else if ( a === -1 ) {
            // -(x - h)^2
            axhString = StringUtils.fillIn( '{{minus}}({{x}} {{operator}} {{h}})<sup>2</sup>', {
              minus: MathSymbols.UNARY_MINUS,
              x: GQSymbols.x,
              operator: operator,
              h: Math.abs( h )
            } );
          }
          else {
            // a(x - h)^2
            axhString = StringUtils.fillIn( '{{a}}({{x}} {{operator}} {{h}})<sup>2</sup>', {
              a: a,
              x: GQSymbols.x,
              operator: operator,
              h: Math.abs( h )
            } );
          }
        }
        children.push( new RichText( axhString, textOptions ) );

        // + k
        if ( k !== 0 ) {
          const kString = StringUtils.fillIn( '{{operator}} {{k}}', {
            operator: ( k > 0 ) ? MathSymbols.PLUS : MathSymbols.MINUS,
            k: Math.abs( k )
          } );
          children.push( new RichText( kString, textOptions ) );
        }
      }

      return layoutOnBackground( children );
    },

    /**
     * Creates the directrix equation, y = directrix
     * @param {number} directrix
     * @public
     */
    createDirectrix( directrix ) {

      const equationString = StringUtils.fillIn( '{{y}} = {{directrix}}', {
        y: GQSymbols.y,
        directrix: Util.toFixedNumber( directrix, GQConstants.DIRECTRIX_DECIMALS )
      } );

      const equationNode = new RichText( equationString, {
        font: new PhetFont( GQConstants.GRAPH_EQUATION_FONT_SIZE ),
        fill: GQColors.DIRECTRIX
      } );

      return layoutOnBackground( [ equationNode ] );
    },

    /**
     * Creates the axis of symmetry equation, x = axisOfSymmetry
     * @param {number} axisOfSymmetry
     * @public
     */
    createAxisOfSymmetry( axisOfSymmetry ) {

      const equationString = StringUtils.fillIn( '{{x}} = {{axisOfSymmetry}}', {
        x: GQSymbols.x,
        axisOfSymmetry: Util.toFixedNumber( axisOfSymmetry, GQConstants.AXIS_OF_SYMMETRY_DECIMALS )
      } );

      const equationNode = new RichText( equationString, {
        font: new PhetFont( GQConstants.GRAPH_EQUATION_FONT_SIZE ),
        fill: GQColors.AXIS_OF_SYMMETRY,
        rotation: Math.PI / 2
      } );

      return layoutOnBackground( [ equationNode ] );
    }
  };

  /**
   * Common method to lay out a set of equation components, and put it on a translucent background.
   * @param {Node[]}children
   * @returns {Node}
   */
  function layoutOnBackground( children ) {

    // lay out the components horizontally
    const hBox = new HBox( {
      spacing: 5,
      align: 'bottom',
      children: children
    } );

    // translucent background, sized to fit
    const backgroundNode = new Rectangle( 0, 0, hBox.width + 4, hBox.height + 2, {
      fill: 'white',
      opacity: 0.75,
      center: hBox.center
    } );

    return new Node( { children: [ backgroundNode, hBox ] } );
  }

  return graphingQuadratics.register( 'GQEquationFactory', GQEquationFactory );
} );