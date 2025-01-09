import random

state = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
availableMoves = set(state)
board = '''
     |     |     
  {}  |  {}  |  {}  
_____|_____|_____
     |     |     
  {}  |  {}  |  {}  
_____|_____|_____
     |     |     
  {}  |  {}  |  {}  
     |     |
'''
winningRows = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
              [0, 3, 6], [1, 4, 7], [2, 5, 8],
              [0, 4, 8], [2, 4, 6]]
gameNotWon = True
# playerX = True

print("Welcome to Tic-Tac-Toe!")

while gameNotWon:
  if len(availableMoves) == 0:
    print("Game over! No available moves...")
    break

  computerMove = random.sample(availableMoves, 1)
  print(computerMove)
  state[int(computerMove[0]) - 1] = "X"
  availableMoves.remove(computerMove[0])

  for row in winningRows:
    if state[row[0]] == state[row[1]] == state[row[2]]:
        print("Player X wins!")
        gameNotWon = not gameNotWon
  
  print(board.format(*state))

  move = input("Player O, choose an available cell number to make your move: ")
  
  if move in availableMoves:
    state[int(move) - 1] = "O"
    availableMoves.remove(move)
  elif move in "123456789":
    print("Sorry, you can't make a move at cell \"{}\".".format(move))
    continue
  else:
    print("Sorry, \"{}\" is an invalid move.".format(move))
    continue
  
  for row in winningRows:
    if state[row[0]] == state[row[1]] == state[row[2]]:
        print("Player O wins!")
        print(board.format(*state))
        gameNotWon = not gameNotWon
    