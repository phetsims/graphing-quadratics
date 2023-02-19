// Copyright 2018-2022, University of Colorado Boulder

/**
 * 'Vertex' checkbox.  The vertex icon can be displayed as either a manipulator or a flat circle.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Manipulator from '../../../../graphing-lines/js/common/view/manipulator/Manipulator.js';
import { Circle } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';
import GQColors from '../GQColors.js';
import GQCheckbox from './GQCheckbox.js';

export default class VertexCheckbox extends GQCheckbox {

  /**
   * @param vertexVisibleProperty
   * @param tandem
   * @param manipulatorIcon - true: icon is a shaded manipulator, false: icon is a flat point
   */
  public constructor( vertexVisibleProperty: Property<boolean>, tandem: Tandem, manipulatorIcon = true ) {

    // icon is either a manipulator (3D sphere) or a flat circle
    const icon = manipulatorIcon ?
                 Manipulator.createIcon( 8, GQColors.VERTEX ) :
                 new Circle( 6, { fill: GQColors.VERTEX } );

    // phetioDocumentation that is appropriate for icon type
    const phetioDocumentation = manipulatorIcon ?
                                'checkbox that shows the vertex manipulator on the graph' :
                                'checkbox that shows the vertex on the graph';

    super( vertexVisibleProperty, GraphingQuadraticsStrings.vertex, {
      icon: icon,
      tandem: tandem,
      phetioDocumentation: phetioDocumentation
    } );
  }
}

graphingQuadratics.register( 'VertexCheckbox', VertexCheckbox );