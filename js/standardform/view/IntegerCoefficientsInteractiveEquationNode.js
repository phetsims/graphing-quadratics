// Copyright 2018, University of Colorado Boulder

/**
 * Renderer for standard form equation with integer cofficients that can be changed.
 * Form is y = ax^2 + bx + c, where a, b, and c can be changed with number pickers
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );
  var RichText = require( 'SCENERY/nodes/RichText' );

  // strings
  var y = 'y';
  var equalsSign = '=';
  var xSquared = 'x<sup>2</sup>';
  var plusSign = '+';
  var x = 'x';

  /**
   * @constructor
   */
  function IntegerCoefficientsInteractiveEquationNode( options ) {
    Node.call( this, options );

    // TODO: temporary variables, will be passed in as parameters
    var aProperty = new NumberProperty( 1, { range: { min:-6, max: 6 } } );
    var bProperty = new NumberProperty( 0, { range: { min:-6, max: 6 } } );
    var cProperty = new NumberProperty( 0, { range: { min:-6, max: 6 } } );

    // interactive components of the equation
    var aNumberPicker = new NumberPicker( aProperty, new Property( aProperty.range ) );
    var bNumberPicker = new NumberPicker( bProperty, new Property( bProperty.range ) );
    var cNumberPicker = new NumberPicker( cProperty, new Property( cProperty.range ) );

    var equationNode = new HBox( {
      children: [
        new RichText( y ),
        new RichText( equalsSign ),
        aNumberPicker,
        new RichText( xSquared ),
        new RichText( plusSign ),
        bNumberPicker,
        new RichText( x ),
        new RichText( plusSign ),
        cNumberPicker
      ],
      align: 'center',
      spacing: 10
    } );
    this.addChild( equationNode );
  }

  graphingQuadratics.register( 'IntegerCoefficientsInteractiveEquationNode', IntegerCoefficientsInteractiveEquationNode );

  return inherit( Node, IntegerCoefficientsInteractiveEquationNode );
} );
