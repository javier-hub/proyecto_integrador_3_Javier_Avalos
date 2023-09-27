CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `catálogo` AS select `c`.`idContenido` AS `id`,concat('http://trailerflix.com/catalogo',`c`.`posterContenido`) AS `poster`,`c`.`tituloContenido` AS `titulo`,`cat`.`nombreCategoria` AS `categoria`,group_concat(distinct `g`.`nombreGenero` order by `g`.`nombreGenero` ASC separator ', ') AS `genero`,`c`.`resumenContenido` AS `resumen`,`c`.`cantidadTemporadas` AS `temporadas`,group_concat(distinct `a`.`nombreActor` order by `a`.`nombreActor` ASC separator ', ') AS `reparto`,`c`.`trailerContenido` AS `trailer` from (((((`contenidos` `c` left join `categorías` `cat` on((`c`.`idCategoria` = `cat`.`idCategoria`))) left join `contenidogenero` `cg` on((`c`.`idContenido` = `cg`.`idContenido`))) left join `géneros` `g` on((`cg`.`idGenero` = `g`.`idGenero`))) left join `contenidoactor` `ca` on((`c`.`idContenido` = `ca`.`idContenido`))) left join `actores` `a` on((`ca`.`idActor` = `a`.`idActor`))) group by `c`.`idContenido`,`c`.`posterContenido`,`c`.`tituloContenido`,`cat`.`nombreCategoria`,`c`.`resumenContenido`,`c`.`cantidadTemporadas`,`c`.`trailerContenido` order by `c`.`idContenido`;