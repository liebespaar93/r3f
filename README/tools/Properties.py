import sys
import re
import os

# 정규 표현식
# https://docs.python.org/ko/3/library/re.html
# https://regexr.com/

# python3 ./Properties.py prop

print(sys.argv)

def main():
    if not (os.path.exists(sys.argv[1])) :
        return
    if (sys.argv[1].find('.') != -1) :
        file_out = sys.argv[1][:sys.argv[1].find('.')]
    else :
        file_out = sys.argv[1]

    fw = open(file_out + "_P.md", 'w')
    fr = open(sys.argv[1], 'r')

    lines = fr.readlines()

    data_all = ""

    fw.write("# 🎩 Properties("+file_out+")\n\n| Property | Type | Note |\n| :-- | :-- | :-- |\n")
    
    for line in lines:
        data = re.sub('(^[\.]([?a-zA-Z]*\s+))', prop, line)
        data = re.sub('([\:]\s([?a-zA-Z0-9]*)$)', prop_type, data)
        if (data == "\n"):
            data_all += "|"
            fw.write(data_all)
            data_all = "\n"
        else :
            data_all += data.replace('\n', ' ')
    
    if (data_all != "\n"):
        data_all += " |"
        fw.write(data_all)

    fw.close()
    fr.close()
    print("생성완료 : ", file_out + "_P.md")


def prop(word):
    re_word = str(word.group())
    re_word = re_word.replace(".", "| ")
    return re_word

def prop_type(word):
    re_word = str(word.group())
    re_word = re_word.replace(":", "|")
    re_word += " |"
    return re_word

main()