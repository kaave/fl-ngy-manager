require 'csv'

csv = CSV.read('db/fixtures/radios.csv')
csv.each.with_index(1) do |line, i|
  Radio.seed(:id) do |s|
    s.id = i
    s.name = line[0]
    s.url = line[1]
    s.memo = line[2]
  end
end