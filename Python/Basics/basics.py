
# Man braucht keine Semikolons in Python, um Zeilenende zu deklarieren
print("Hello World")

# Damit dieser Code funktioniert, muss das print("Das stimmt") eingerückt sein -> das ist sehr wichtig in Python
if 4 > 2:
    print("Das stimmt")

# Der folgende Code block wird nicht funktionieren, weil print nur str enthalten kann
# x = 4
# print("Heute sind " + x + "Menschen geboren")

x = 3
print(x)
print(type(x))

#Das geht, weil y als eine Zahl definiert ist und somit funktioniert der print-Befehl
y = "3"
print("Heute ist der " + y + " Tag")

#Damit kann man die Sachen aus einem Array auspacken
weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
a, b, c, d, e = weekDays
print(a)
print(c)
#Hier will ich prüfen, ob der Text a gleich ist wie der Text c -> somit muss das if ... auch in Klammern
if "a == c":
    print("Today is NoDay")