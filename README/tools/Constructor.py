import sys
import re
import os

# 정규 표현식
# https://docs.python.org/ko/3/library/re.html

# python3 ./Method.py meth  

print(sys.argv)

dic = {}

def main():
    if not (os.path.exists(sys.argv[1])) :
        return
    if (sys.argv[1].find('.') != -1) :
        file_out = sys.argv[1][:sys.argv[1].find('.')]
    else :
        file_out = sys.argv[1]

    fw = open(file_out + "_C.md", 'w')
    fr = open(sys.argv[1], 'r')

    lines = fr.readlines()

    data_all = ""

    fw.write("# ✨ Constructor("+file_out+")\n\n| Parameter | Type | Note |\n| :-- | :-- | :-- |\n")
    
    for line in lines:
        data = re.sub('[a-zA-z]+\s:\s[a-zA-z]+', constructor, line)
        data = re.sub('[a-zA-z]+\s(—)\s(.)+', constructor_parameter, line)

    for k, l in dic.items():
        re_word = "| " + k + " |"
        for v in l:
            re_word += " " + v + " |"
        fw.write(re_word + "\n")
    
    fw.close()
    fr.close()
    print("생성완료 : ", file_out + "_C.md")

def constructor(word):
    re_word = str(word.group())
    dic[re_word[:re_word.index(':') - 1]] = []
    dic[re_word[:re_word.index(':') - 1]].append(re_word[re_word.index(':') + 2:])
    return re_word

def constructor_parameter(word):
    re_word = str(word.group())
    dic[re_word[:re_word.index('—') - 1]].append(re_word[re_word.index('—') + 2:])
    return re_word

main()