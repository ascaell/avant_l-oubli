##
## AVANT L'OUBLI - Makefile
##

NAME		=	avant_l_oubli

CC			=	clang

## Recuperation automatique des flags Raylib via pkg-config.
## Aucun chemin /opt/homebrew code en dur : pkg-config s'en charge.
RAYLIB_CFLAGS	:=	$(shell pkg-config --cflags raylib)
RAYLIB_LIBS		:=	$(shell pkg-config --libs raylib)

## Garde-fou : si pkg-config ne trouve pas raylib, on arrete avec un
## message clair au lieu de compiler sans les flags (source de l'erreur
## 'raylib.h file not found').
ifeq ($(strip $(RAYLIB_LIBS)),)
$(error raylib introuvable via pkg-config. Verifie PKG_CONFIG_PATH \
(ex: export PKG_CONFIG_PATH="$$(brew --prefix raylib)/lib/pkgconfig"))
endif

CFLAGS		=	-Wall -Wextra -std=c11 -Isrc -Isrc/core $(RAYLIB_CFLAGS)
LDFLAGS		=	$(RAYLIB_LIBS) -lm

SRC			=	src/main.c				\
				src/core/game.c			\
				src/core/game_state.c	\
				src/core/window.c		\
				src/core/clock.c		\
				src/core/events.c		\
				src/core/camera.c		\
				src/core/scene.c		\
				src/core/modules.c		\
				src/core/modules_setup.c

OBJ			=	$(SRC:.c=.o)

all:		$(NAME)

$(NAME):	$(OBJ)
	$(CC) $(OBJ) -o $(NAME) $(LDFLAGS)

clean:
	rm -f $(OBJ)

fclean:		clean
	rm -f $(NAME)

re:			fclean all

.PHONY:		all clean fclean re
